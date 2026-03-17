import { ref, reactive } from 'vue'

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

const sauvegarder = () => {
  localStorage.setItem('u', JSON.stringify({
    id: utilisateur.id,
    username: utilisateur.username,
    avatar: utilisateur.avatar,
    email: utilisateur.email,
    estConnecte: utilisateur.estConnecte,
    solde: solde.value,
    inventaire,
    caissesOuvertes: caissesOuvertes.value
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
    inventaire.length = 0
    if (donnees.inventaire) inventaire.push(...donnees.inventaire)
  }
}

export default {
  utilisateur,
  solde,
  inventaire,
  caissesOuvertes,
  definirInfosUtilisateur: (infos) => { Object.assign(utilisateur, infos); sauvegarder() },
  reinitialiserStore: () => {
    utilisateur.id = null
    utilisateur.username = 'Anonyme'
    utilisateur.avatar = null
    utilisateur.email = null
    utilisateur.estConnecte = false
    solde.value = 0
    caissesOuvertes.value = 0
    inventaire.length = 0
    localStorage.removeItem('u')
  },
  chargerDepuisLocalStorage: charger
}
