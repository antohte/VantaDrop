<template>
  <EnteteSite />

  <main class="m">
    <div class="c">
      <div v-if="store.inventaire.length === 0" class="es">
        <p>Aucun objet pour le moment</p>
      </div>
      <div v-else class="ig">
        <div v-for="(objet, idx) in store.inventaire" :key="idx" class="ii">
          <h3>{{ objet.name }}</h3>
          <p>{{ objet.value }}€</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import EnteteSite from '../components/EnteteSite.vue'
import store from '../stores/userStore'
</script>

<style scoped>
.m { flex: 1; padding: 2rem 0; }
.c { max-width: 1440px; margin: 0 auto; padding: 0 1.5rem; }
.es { text-align: center; padding: 2rem; border: 1px dashed #1a1a1a; border-radius: 8px; color: #aaa; background: #0f0f0f; }
.ig { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }
.ii { background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 8px; padding: 1rem; }
.ii h3 { margin: 0 0 0.5rem; color: #fff; }
.ii p { margin: 0; color: #ffb400; }
</style>
