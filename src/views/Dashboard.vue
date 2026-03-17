<template>
  <EnteteSite />

  <main class="m">
    <div class="c">
      <section class="hero">
        <h1>Bienvenue {{ s.utilisateur.username }}</h1>
        <p>Tu retrouves ici toutes tes caisses et tes drops.</p>
      </section>

      <input v-model="recherche" type="text" placeholder="Rechercher..." class="sb">
      <section class="s">
        <h2>À la une</h2>
        <div class="g">
          <div class="ph">Bientôt disponible</div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import EnteteSite from '../components/EnteteSite.vue'
import s from '../stores/userStore'

const recherche = ref('')
</script>

<style scoped>
.m { flex: 1; padding: 3rem 0; }
.c { max-width: 1440px; margin: 0 auto; padding: 0 1.5rem; }
.hero { margin-bottom: 2rem; text-align: center; }
.hero h1 { font-size: 2.2rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #ffb400, #9c27b0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero p { color: #cfcfcf; }
.sb { width: 100%; max-width: 520px; padding: 1.2rem; background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 8px; color: white; margin: 0 auto 2rem; display: block; }
.sb:focus { outline: none; border-color: #ffb400; box-shadow: 0 0 20px rgba(156, 39, 176, 0.2); }
.s { margin-bottom: 3rem; }
.s h2 { color: #ffb400; text-transform: uppercase; margin-bottom: 1rem; }
.g { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 2rem; }
.ph { background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 8px; padding: 1.6rem; color: #fff; text-align: center; }
</style>
