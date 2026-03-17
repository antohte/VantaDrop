import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import Profile from './views/Profile.vue'
import Inventory from './views/Inventory.vue'
import AuthCallback from './components/AuthCallback.vue'
import store from './stores/userStore'
import './styles/main.css'

store.chargerDepuisLocalStorage()

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/dashboard', component: Dashboard, name: 'Dashboard', meta: { authRequise: true } },
  { path: '/profile', component: Profile, name: 'Profile', meta: { authRequise: true } },
  { path: '/inventory', component: Inventory, name: 'Inventory', meta: { authRequise: true } },
  { path: '/auth/callback', component: AuthCallback, name: 'AuthCallback' },
]

const routeur = createRouter({ history: createWebHistory(), routes })

routeur.beforeEach((to, from, next) => {
  if (to.meta.authRequise && !store.utilisateur.estConnecte) next('/')
  else next()
})

createApp(App).use(routeur).mount('#app')
