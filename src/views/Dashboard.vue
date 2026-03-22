<template>
  <EnteteSite />

  <main class="m">
    <div class="c">
      <section class="hero">
        <h1>Bienvenue {{ store.utilisateur.username }}</h1>
        <p>Tu retrouves ici toutes tes caisses et tes drops.</p>

        <div class="stats">
          <div class="stat">
            <span>Solde</span>
            <strong>{{ store.solde.value }}€</strong>
          </div>
          <div class="stat">
            <span>Caisses ouvertes</span>
            <strong>{{ store.caissesOuvertes.value }}</strong>
          </div>
          <div class="stat">
            <span>Objets</span>
            <strong>{{ store.inventaire.length }}</strong>
          </div>
        </div>
      </section>

      <section class="s">
        <h2>Caisses</h2>
        <div class="grille-boxes">
          <article class="box-card" v-for="caisse in caisses" :key="caisse.nom">
            <h3>{{ caisse.nom }}</h3>
            <p>xx;xx€</p>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import EnteteSite from '../components/EnteteSite.vue'
import store from '../stores/userStore'

const caisses = [
  { nom: 'Caisse Bronze' },
  { nom: 'Caisse Argent' },
  { nom: 'Caisse Or' }
]
</script>

<style scoped>
.m { flex: 1; padding: 3rem 0; }
.c { max-width: 1440px; margin: 0 auto; padding: 0 1.5rem; }
.hero { margin-bottom: 2rem; text-align: center; }
.hero h1 { font-size: 2.2rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #ffb400, #9c27b0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero p { color: #cfcfcf; }
.stats { margin-top: 1.3rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.8rem; }
.stat { background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 8px; padding: 0.8rem; }
.stat span { display: block; font-size: 0.8rem; color: #b9b9b9; margin-bottom: 0.3rem; }
.stat strong { color: #fff; }
.s { margin-bottom: 3rem; }
.s h2 { color: #ffb400; text-transform: uppercase; margin-bottom: 1rem; }
.grille-boxes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.box-card { background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 10px; padding: 1rem; transition: 0.2s; }
.box-card:hover { border-color: #ffb400; transform: translateY(-2px); }
.box-card h3 { color: #fff; margin-bottom: 0.4rem; }
.box-card p { color: #ffb400; font-weight: 700; }

@media (max-width: 800px) {
  .stats, .grille-boxes { grid-template-columns: 1fr; }
}
</style>
