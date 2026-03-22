<template>
  <EnteteSite />

  <main class="m">
    <div class="c">
      <section class="hero">
        <h1>Items disponibles</h1>
        <p>Tu peux chercher et trier les items par prix.</p>
        <div class="count">{{ totalFiltres }} items trouvés</div>
      </section>

      <div class="outils">
        <input v-model="recherche" type="text" placeholder="Rechercher un item..." class="sb">

        <select v-model="triPrix" class="tri">
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
      </div>

      <section class="s">
        <div v-if="chargement" class="ph">Chargement des items...</div>
        <div v-else-if="erreur" class="ph">{{ erreur }}</div>
        <div v-else-if="elementsFiltres.length === 0" class="ph">Aucun résultat</div>

        <div v-else>
          <div class="g">
            <article v-for="e in elementsPage" :key="e.id" class="carte">
              <img :src="e.image" :alt="e.nom" class="img">
              <span class="badge" :class="`badge-${obtenirRarete(e.prix).classe}`">{{ obtenirRarete(e.prix).texte }}</span>
              <h3>{{ e.nom }}</h3>
              <p>{{ e.prix }}€</p>
            </article>
          </div>

          <div class="pagination">
            <button class="btn-page" @click="pagePrecedente" :disabled="pageActuelle === 1">Précédent</button>
            <span>Page {{ pageActuelle }} / {{ totalPages }}</span>
            <button class="btn-page" @click="pageSuivante" :disabled="pageActuelle === totalPages">Suivant</button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import EnteteSite from '../components/EnteteSite.vue'
import { recupererSneakers } from '../services/sneakerDb'

const recherche = ref('')
const triPrix = ref('asc')
const chargement = ref(false)
const erreur = ref('')
const elements = ref([])
const pageActuelle = ref(1)
const elementsParPage = 24

const elementsFiltres = computed(() => {
  const texte = recherche.value.toLowerCase().trim()
  let liste = elements.value

  if (texte) {
    liste = liste.filter(e => e.nom.toLowerCase().includes(texte))
  }

  const resultat = [...liste]
  resultat.sort((a, b) => {
    if (triPrix.value === 'asc') return a.prix - b.prix
    return b.prix - a.prix
  })

  return resultat
})

const totalFiltres = computed(() => elementsFiltres.value.length)
const totalPages = computed(() => {
  const pages = Math.ceil(elementsFiltres.value.length / elementsParPage)
  return pages > 0 ? pages : 1
})

const elementsPage = computed(() => {
  const debut = (pageActuelle.value - 1) * elementsParPage
  const fin = debut + elementsParPage
  return elementsFiltres.value.slice(debut, fin)
})

watch([recherche, triPrix], () => {
  pageActuelle.value = 1
})

watch(totalPages, (nouveauTotal) => {
  if (pageActuelle.value > nouveauTotal) {
    pageActuelle.value = nouveauTotal
  }
})

const pagePrecedente = () => {
  if (pageActuelle.value > 1) pageActuelle.value = pageActuelle.value - 1
}

const pageSuivante = () => {
  if (pageActuelle.value < totalPages.value) pageActuelle.value = pageActuelle.value + 1
}

const obtenirRarete = (prix) => {
  if (prix < 150) return { texte: 'Commun', classe: 'common' }
  if (prix < 500) return { texte: 'Rare', classe: 'rare' }
  return { texte: 'Épique', classe: 'epic' }
}

const chargerElements = async () => {
  chargement.value = true
  erreur.value = ''

  try {
    elements.value = await recupererSneakers(150)
  } catch (err) {
    erreur.value = err.message || 'Erreur API items'
  } finally {
    chargement.value = false
  }
}

onMounted(() => {
  chargerElements()
})
</script>

<style scoped>
.m { flex: 1; padding: 3rem 0; }
.c { max-width: 1440px; margin: 0 auto; padding: 0 1.5rem; }
.hero { margin-bottom: 2rem; text-align: center; }
.hero h1 { font-size: 2.2rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #ffb400, #9c27b0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero p { color: #cfcfcf; }
.count { margin-top: 0.7rem; color: #ffb400; font-weight: 700; }
.outils { display: grid; grid-template-columns: 1fr 220px; gap: 1rem; margin-bottom: 2rem; }
.sb, .tri { padding: 1rem; background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 8px; color: #fff; }
.sb:focus, .tri:focus { outline: none; border-color: #ffb400; }
.s { margin-bottom: 3rem; }
.g { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
.ph { background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 8px; padding: 1.6rem; color: #fff; text-align: center; }
.carte { background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 8px; padding: 1rem; }
.carte:hover { border-color: #ffb400; box-shadow: 0 0 20px rgba(156, 39, 176, 0.15); }
.img { width: 100%; height: 150px; object-fit: cover; border-radius: 6px; margin-bottom: 0.8rem; }
.badge { display: inline-block; margin-bottom: 0.7rem; padding: 0.2rem 0.55rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; }
.badge-common { background: #1f2a44; color: #9bc0ff; }
.badge-rare { background: #2b1e4a; color: #c9a0ff; }
.badge-epic { background: #3a1b29; color: #ff9ec8; }
.carte h3 { font-size: 0.95rem; margin-bottom: 0.4rem; color: #fff; }
.carte p { color: #ffb400; font-weight: 600; }
.pagination { margin-top: 1.2rem; display: flex; align-items: center; justify-content: center; gap: 0.8rem; color: #fff; }
.btn-page { padding: 0.5rem 0.9rem; background: #1a1a1a; border: 1px solid #333; color: #fff; border-radius: 8px; cursor: pointer; }
.btn-page:disabled { opacity: 0.5; cursor: not-allowed; }

@media (max-width: 700px) {
  .outils { grid-template-columns: 1fr; }
}
</style>
