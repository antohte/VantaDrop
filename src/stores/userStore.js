import { ref, reactive } from 'vue'

const user = reactive({
  id: null,
  username: 'Anonymous',
  avatar: null,
  email: null,
  isAuthenticated: false
})

const balance = ref(0)
const inventory = reactive([])

const save = () => {
  localStorage.setItem('u', JSON.stringify({
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    email: user.email,
    isAuthenticated: user.isAuthenticated,
    balance: balance.value,
    inventory
  }))
}

const load = () => {
  const d = localStorage.getItem('u')
  if (d) {
    const u = JSON.parse(d)
    user.id = u.id
    user.username = u.username
    user.avatar = u.avatar
    user.email = u.email
    user.isAuthenticated = u.isAuthenticated
    balance.value = u.balance || 0
    inventory.length = 0
    if (u.inventory) inventory.push(...u.inventory)
  }
}

export default {
  user,
  balance,
  inventory,
  setUserInfo: (info) => { Object.assign(user, info); save() },
  resetStore: () => {
    user.id = null
    user.username = 'Anonymous'
    user.avatar = null
    user.email = null
    user.isAuthenticated = false
    balance.value = 0
    inventory.length = 0
    localStorage.removeItem('u')
  },
  loadFromLocalStorage: load
}
