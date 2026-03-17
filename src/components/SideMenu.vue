<template>
  <div class="mw">
    <button class="mb" :class="{ a: ouvert }" @click="ouvrirFermerMenu">☰</button>
    <div class="dm" :class="{ a: ouvert }">
      <button @click="() => { r.push('/profile'); ouvert = false }">Profil</button>
      <button @click="() => { r.push('/inventory'); ouvert = false }">Inventaire</button>
      <button @click="deconnexion">Déconnexion</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import s from '../stores/userStore'
import * as auth from '../services/discordAuth'

const r = useRouter()
const ouvert = ref(false)

const ouvrirFermerMenu = () => {
  ouvert.value = !ouvert.value
}

const deconnexion = () => {
  if (confirm('Se déconnecter ?')) {
    auth.supprimerTokenAuth()
    s.reinitialiserStore()
    r.push('/')
    ouvert.value = false
  }
}
</script>

<style scoped>
.mw { position: relative; z-index: 1000; }
.mb { width: 40px; height: 40px; background: transparent; border: 1px solid #ffb400; border-radius: 8px; cursor: pointer; color: #ffb400; }
.mb:hover { background: rgba(255, 180, 0, 0.1); }
.dm { position: absolute; top: calc(100% + 12px); right: 0; width: 200px; background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 8px; display: none; flex-direction: column; }
.dm.a { display: flex; }
.dm button { width: 100%; padding: 1rem; border: none; background: none; color: white; cursor: pointer; border-bottom: 1px solid #1a1a1a; text-align: left; }
.dm button:last-child { border: none; }
.dm button:hover { background: rgba(255, 180, 0, 0.1); }
</style>
