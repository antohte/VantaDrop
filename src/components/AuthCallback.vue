<template>
  <div class="ac">
    <div v-if="chargement" class="ls">Chargement...</div>
    <div v-else-if="erreur" class="es">
      <h2>Erreur</h2>
      <p>{{ erreur }}</p>
    </div>
    <div v-else>
      <h2>Bienvenue {{ utilisateur.username }} !</h2>
      <p>Redirection...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as auth from '../services/discordAuth'
import s from '../stores/userStore'

const r = useRouter()
const chargement = ref(true)
const erreur = ref(null)
const utilisateur = ref({})

onMounted(async () => {
  try {
    const token = auth.obtenirTokenDepuisFragment()
    if (!token) throw new Error('Aucun token')
    
    auth.sauvegarderTokenAuth(token)
    const utilisateurDiscord = await auth.recupererUtilisateurDiscord(token.tokenAcces)
    utilisateur.value = utilisateurDiscord
    
    s.definirInfosUtilisateur({
      id: utilisateurDiscord.id,
      username: utilisateurDiscord.username,
      avatar: utilisateurDiscord.avatar,
      email: utilisateurDiscord.email,
      estConnecte: true
    })
    
    chargement.value = false
    r.push('/dashboard')
  } catch (erreurCapturee) {
    erreur.value = erreurCapturee.message
    chargement.value = false
  }
})
</script>

<style scoped>
.ac { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0a; }
.ls { text-align: center; color: white; }
.es { text-align: center; color: #ff4545; }
</style>
