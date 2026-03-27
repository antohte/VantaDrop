import { ref, reactive, computed } from 'vue'
import { lireProfil, synchroniserProfil } from '../services/profilApi'

const PRIX_CAISSES = {
  bronze: 90,
  silver: 180,
  gold: 360
}

const obtenirRarete = (prix) => {
  if (prix < 150) return 'commun'
  if (prix < 500) return 'rare'
  return 'epique'
}

const choisirItemDansListe = (liste) => {
  if (!liste.length) return null

  const index = Math.floor(Math.random() * liste.length)
  return liste[index]
}

const tirerTrancheAvecPoids = (tranches) => {
  // on garde que les tranches qui ont au moins 1 item dispo
  const tranchesDispo = tranches.filter((t) => t.items.length > 0)
  if (!tranchesDispo.length) return null

  // ex: si poids 88/11/1 on tire sur 100 au total
  const total = tranchesDispo.reduce((acc, t) => acc + t.poids, 0)
  let cible = Math.random() * total

  for (const tranche of tranchesDispo) {
    cible -= tranche.poids
    if (cible <= 0) return tranche
  }

  return tranchesDispo[tranchesDispo.length - 1]
}

const choisirItemBronze = (items) => {
  // bronze: >200 impossible
  const tranches = [
    {
      poids: 88,
      items: items.filter((item) => {
        const prix = Number(item?.prix || 0)
        return Number.isFinite(prix) && prix > 0 && prix <= 90
      })
    },
    {
      poids: 11,
      items: items.filter((item) => {
        const prix = Number(item?.prix || 0)
        return Number.isFinite(prix) && prix > 90 && prix <= 180
      })
    },
    {
      poids: 1,
      items: items.filter((item) => {
        const prix = Number(item?.prix || 0)
        return Number.isFinite(prix) && prix > 180 && prix <= 200
      })
    }
  ]

  const tranche = tirerTrancheAvecPoids(tranches)
  return tranche ? choisirItemDansListe(tranche.items) : null
}

const choisirItemSilver = (items) => {
  // silver: <100 impossible et >400 impossible
  const tranches = [
    {
      poids: 60,
      items: items.filter((item) => {
        const prix = Number(item?.prix || 0)
        return Number.isFinite(prix) && prix >= 100 && prix <= 180
      })
    },
    {
      poids: 39,
      items: items.filter((item) => {
        const prix = Number(item?.prix || 0)
        return Number.isFinite(prix) && prix > 180 && prix <= 300
      })
    },
    {
      poids: 1,
      items: items.filter((item) => {
        const prix = Number(item?.prix || 0)
        return Number.isFinite(prix) && prix > 300 && prix <= 400
      })
    }
  ]

  const tranche = tirerTrancheAvecPoids(tranches)
  return tranche ? choisirItemDansListe(tranche.items) : null
}

const choisirItemGold = (items) => {
  // gold: <250 impossible
  const tranches = [
    {
      poids: 58,
      items: items.filter((item) => {
        const prix = Number(item?.prix || 0)
        return Number.isFinite(prix) && prix >= 250 && prix <= 360
      })
    },
    {
      poids: 40,
      items: items.filter((item) => {
        const prix = Number(item?.prix || 0)
        return Number.isFinite(prix) && prix > 360 && prix <= 660
      })
    },
    {
      poids: 2,
      items: items.filter((item) => {
        const prix = Number(item?.prix || 0)
        return Number.isFinite(prix) && prix > 660
      })
    }
  ]

  const tranche = tirerTrancheAvecPoids(tranches)
  return tranche ? choisirItemDansListe(tranche.items) : null
}

const utilisateur = reactive({
  id: null,
  username: 'Anonyme',
  avatar: null,
  email: null,
  estConnecte: false
})

const solde = ref(0)
const inventaire = reactive([])
const caissesOuvertes = ref(0)
const xp = ref(0)

const niveau = computed(() => 1 + Math.floor((xp.value || 0) / 100))
const xpDansNiveau = computed(() => (xp.value || 0) % 100)

const sauvegarder = () => {
  localStorage.setItem('u', JSON.stringify({
    id: utilisateur.id,
    username: utilisateur.username,
    avatar: utilisateur.avatar,
    email: utilisateur.email,
    estConnecte: utilisateur.estConnecte,
    solde: solde.value,
    inventaire,
    caissesOuvertes: caissesOuvertes.value,
    xp: xp.value
  }))
}

const charger = () => {
  const donneesBrutes = localStorage.getItem('u')
  if (donneesBrutes) {
    const donnees = JSON.parse(donneesBrutes)
    utilisateur.id = donnees.id
    utilisateur.username = donnees.username
    utilisateur.avatar = donnees.avatar
    utilisateur.email = donnees.email
    utilisateur.estConnecte = donnees.estConnecte || false
    solde.value = donnees.solde || 0
    caissesOuvertes.value = donnees.caissesOuvertes || 0
    xp.value = donnees.xp || 0
    inventaire.length = 0
    if (donnees.inventaire) inventaire.push(...donnees.inventaire)
  }
}

const ajouterXp = (montant) => {
  xp.value = xp.value + Math.max(0, montant)
  sauvegarder()
}

const chargerDepuisServeur = async () => {
  if (!utilisateur.id) return

  try {
    let profil = null

    try {
      // si profil existe en bdd on prend direct les vraies data
      profil = await lireProfil(utilisateur.id)
    } catch {
      // sinon on cree le profil avec ce qu'on a en local
      profil = await synchroniserProfil({
        discordId: utilisateur.id,
        pseudo: utilisateur.username,
        avatar: utilisateur.avatar,
        email: utilisateur.email,
        argent: solde.value,
        xp: xp.value,
        niveau: niveau.value,
        caissesOuvertes: caissesOuvertes.value,
        items: [...inventaire]
      })
    }

    utilisateur.id = profil.discordId
    utilisateur.username = profil.pseudo
    utilisateur.avatar = profil.avatar
    utilisateur.email = profil.email
    utilisateur.estConnecte = true
    solde.value = profil.argent || 0
    xp.value = profil.xp || 0
    caissesOuvertes.value = profil.caissesOuvertes || 0
    inventaire.length = 0
    inventaire.push(...(profil.items || []))
    sauvegarder()
  } catch {
    // fallback: api off -> on reste en local pr pas bloquer le joueur
  }
}

const sauvegarderSurServeur = async () => {
  if (!utilisateur.id) return

  try {
    // sync simple: on envoie tout l'etat actuel du joueur
    await synchroniserProfil({
      discordId: utilisateur.id,
      pseudo: utilisateur.username,
      avatar: utilisateur.avatar,
      email: utilisateur.email,
      argent: solde.value,
      xp: xp.value,
      niveau: niveau.value,
      caissesOuvertes: caissesOuvertes.value,
      items: [...inventaire]
    })
  } catch {
    // fallback: si api down on garde juste localStorage
  }
}

const acheterCaisse = async (caisse, itemsDispo) => {
  const items = Array.isArray(itemsDispo) ? itemsDispo : []
  const type = caisse?.type || 'bronze'
  const prix = Number(PRIX_CAISSES[type] || 0)

  if (!Number.isFinite(prix) || prix <= 0) {
    return { ok: false, message: 'Prix de caisse invalide.' }
  }

  if (solde.value < prix) {
    return { ok: false, message: 'Solde insuffisant.' }
  }

  let itemTire = null

  // ici chaque box a ses regles de % + limites de prix
  if (type === 'bronze') {
    itemTire = choisirItemBronze(items)
  } else if (type === 'silver') {
    itemTire = choisirItemSilver(items)
  } else if (type === 'gold') {
    itemTire = choisirItemGold(items)
  } else {
    return { ok: false, message: 'Type de caisse invalide.' }
  }

  if (!itemTire) {
    return { ok: false, message: 'Aucun item disponible.' }
  }

  solde.value = solde.value - prix
  caissesOuvertes.value = caissesOuvertes.value + 1
  xp.value = xp.value + 10

  // on push l'item gagne dans l'inventaire joueur
  inventaire.push({
    id: itemTire.id,
    nom: itemTire.nom,
    prix: Number(itemTire.prix || 0),
    image: itemTire.image,
    rarete: obtenirRarete(Number(itemTire.prix || 0))
  })

  sauvegarder()
  // on tente de sauver aussi en bdd
  await sauvegarderSurServeur()

  return {
    ok: true,
    prixCaisse: prix,
    item: {
      nom: itemTire.nom,
      prix: Number(itemTire.prix || 0),
      image: itemTire.image,
      rarete: obtenirRarete(Number(itemTire.prix || 0))
    }
  }
}

export default {
  utilisateur,
  solde,
  inventaire,
  caissesOuvertes,
  xp,
  niveau,
  xpDansNiveau,
  definirInfosUtilisateur: (infos) => { Object.assign(utilisateur, infos); sauvegarder() },
  chargerDepuisServeur,
  sauvegarderSurServeur,
  PRIX_CAISSES,
  acheterCaisse,
  ajouterXp,
  reinitialiserStore: () => {
    utilisateur.id = null
    utilisateur.username = 'Anonyme'
    utilisateur.avatar = null
    utilisateur.email = null
    utilisateur.estConnecte = false
    solde.value = 0
    caissesOuvertes.value = 0
    xp.value = 0
    inventaire.length = 0
    localStorage.removeItem('u')
  },
  chargerDepuisLocalStorage: charger
}
