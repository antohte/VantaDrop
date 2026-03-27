<template>
  <EnteteSite />

  <main class="m">
    <div class="c">
      <div v-if="store.inventaire.length === 0" class="es">
        <p>Aucun objet pour le moment</p>
      </div>
      <div v-else class="ig">
        <div v-for="(objet, idx) in store.inventaire" :key="idx" class="ii">
          <img v-if="objet.image" :src="objet.image" :alt="objet.nom || objet.name" class="img-objet" />
          <div v-else class="img-vide">pas d'image</div>
          <h3>{{ objet.nom || objet.name }}</h3>
          <p>{{ objet.prix || objet.value }}€</p>
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
.img-objet { width: 100%; height: 140px; object-fit: cover; border-radius: 8px; margin-bottom: 0.7rem; }
.img-vide { width: 100%; height: 140px; border-radius: 8px; margin-bottom: 0.7rem; display: flex; align-items: center; justify-content: center; color: #777; background: #161616; border: 1px dashed #2a2a2a; }
.ii h3 { margin: 0 0 0.5rem; color: #fff; }
.ii p { margin: 0; color: #ffb400; }
</style>
