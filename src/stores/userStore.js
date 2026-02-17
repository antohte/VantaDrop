import { ref, reactive } from 'vue'

/* État utilisateur */
export const user = reactive({
  id: null,
  username: 'Anonymous',
  avatar: null,
  isAuthenticated: false
})

/* Solde utilisateur */
export const balance = ref(0)

/* Inventaire */
export const inventory = reactive([])

/* Mettre à jour les infos utilisateur */
export const setUserInfo = (userInfo) => {
  Object.assign(user, userInfo)
}

/* Réinitialiser */
export const resetStore = () => {
  user.id = null
  user.username = 'Anonymous'
  user.avatar = null
  user.isAuthenticated = false
  balance.value = 0
  inventory.length = 0
}

export default {
  user,
  balance,
  inventory,
  setUserInfo,
  resetStore
}
