import { ref, reactive, computed } from 'vue'

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

const enregistrerAchatBox = () => {
  caissesOuvertes.value = caissesOuvertes.value + 1
  ajouterXp(10)
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
  ajouterXp,
  enregistrerAchatBox,
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
