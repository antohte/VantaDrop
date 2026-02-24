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

store.loadFromLocalStorage()

const rts = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/dashboard', component: Dashboard, name: 'Dashboard', meta: { requiresAuth: true } },
  { path: '/profile', component: Profile, name: 'Profile', meta: { requiresAuth: true } },
  { path: '/inventory', component: Inventory, name: 'Inventory', meta: { requiresAuth: true } },
  { path: '/auth/callback', component: AuthCallback, name: 'AuthCallback' },
]

const r = createRouter({ history: createWebHistory(), routes: rts })

r.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.user.isAuthenticated) next('/')
  else next()
})

createApp(App).use(r).mount('#app')
