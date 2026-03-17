<template>
  <EnteteSite />

  <main class="m">
    <div class="c">
      <section v-if="!s.utilisateur.estConnecte" class="ws">
        <h2>Bienvenue sur VantaDrop</h2>
        <p>Plateforme d'ouverture de caisses</p>
      </section>

      <section v-if="s.utilisateur.estConnecte" class="ps">
        <h2>Profil</h2>
        <div class="pi">
          <div>Pseudo: {{ s.utilisateur.username }}</div>
          <div>Solde: {{ s.solde.value }}€</div>
          <div>Objets: {{ s.inventaire.length }}</div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EnteteSite from '../components/EnteteSite.vue'
import s from '../stores/userStore'

const r = useRouter()

onMounted(() => {
  if (s.utilisateur.estConnecte) r.push('/dashboard')
})
</script>

<style scoped>
.c { max-width: 1440px; margin: 0 auto; padding: 0 1.5rem; }

.m { flex: 1; padding: 3rem 0; }

.ws {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.ws h2 {
  font-size: 3rem;
  background: linear-gradient(135deg, #ffb400, #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ps { margin-bottom: 3rem; }

.pi {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
  background: #0f0f0f;
  border: 1px solid #1a1a1a;
  border-radius: 8px;
}

.pi div { color: #fff; }
</style>

