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
            <span>Items</span>
            <strong>{{ store.inventaire.length }}</strong>
          </div>
        </div>
      </section>

      <section class="s">
        <h2>Caisses</h2>
        <div class="grille-boxes">
          <button v-for="caisse in caisses" :key="caisse.nom" class="btn-caisse" @click="ouvrirModal(caisse)">
            <img :src="caisse.image" :alt="caisse.nom" class="img-caisse">
            <span class="nom-caisse">{{ caisse.nom }}</span>
            <span class="prix-caisse">{{ caisse.prix }}€</span>
          </button>
        </div>
      </section>
    </div>
  </main>

  <div v-if="afficherModal" class="modal-overlay" @click="fermerModal">
    <div class="modal-contenu" @click.stop>
      <h2>Confirmer l'achat</h2>
      <p>Tu veux acheter la caisse <strong>{{ caisseSelectionnee.nom }}</strong> pour <strong>{{ caisseSelectionnee.prix }}€</strong> ?</p>
      <div class="modal-boutons">
        <button class="btn-annuler" @click="fermerModal">Annuler</button>
        <button class="btn-confirmer" :disabled="chargementItems" @click="acheter">
          {{ chargementItems ? 'chargement...' : 'Confirmer' }}
        </button>
      </div>
    </div>
  </div>

  <div v-if="afficherAnimation" class="roulette-overlay">
    <div class="roulette-boite">
      <h2>ouverture en cours...</h2>

      <div class="roulette-zone">
        <div ref="marqueurRef" class="roulette-marqueur"></div>
        <div ref="fenetreRef" class="roulette-fenetre">
          <div class="roulette-piste" :style="{ transform: `translateX(-${offsetRoulette}px)`, transition: pisteTransition }">
            <div v-for="(item, idx) in cartesRoulette" :key="item.cle" class="roulette-carte" :data-idx="idx" :class="{ 'roulette-gagnant': idx === INDEX_GAGNANT && !animationEnCours }">
              <img v-if="item.image" :src="item.image" :alt="item.nom" class="roulette-img">
              <div v-else class="roulette-img-vide">pas d'image</div>
              <div class="roulette-nom">{{ item.nom }}</div>
              <div class="roulette-prix">{{ item.prix }}€</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!animationEnCours && itemGagne" class="roulette-resultat">
        <p>tu as gagne:</p>
        <strong>{{ itemGagne.nom }} ({{ itemGagne.prix }}€)</strong>
      </div>

      <button class="btn-fermer-roulette" :disabled="animationEnCours" @click="fermerAnimation">fermer</button>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
import EnteteSite from '../components/EnteteSite.vue'
import store from '../stores/userStore'
import { recupererSneakers } from '../services/sneakerDb'

const NB_ITEMS_API = 450

const afficherModal = ref(false)
const caisseSelectionnee = ref(null)
const itemsDispo = ref([])
const chargementItems = ref(false)
const afficherAnimation = ref(false)
const animationEnCours = ref(false)
const cartesRoulette = ref([])
const itemGagne = ref(null)
const offsetRoulette = ref(0)
const pisteTransition = ref('none')
const fenetreRef = ref(null)
const marqueurRef = ref(null)

const INDEX_GAGNANT = 45
const attendreFrame = () => new Promise((resolve) => requestAnimationFrame(resolve))

const caisses = [
  { type: 'bronze', nom: 'Caisse Bronze', image: '/src/assets/bronze_box.png', prix: store.PRIX_CAISSES.bronze },
  { type: 'silver', nom: 'Caisse Argent', image: '/src/assets/silver_box.png', prix: store.PRIX_CAISSES.silver },
  { type: 'gold', nom: 'Caisse Or', image: '/src/assets/gold_box.png', prix: store.PRIX_CAISSES.gold }
]

const ouvrirModal = (caisse) => {
  caisseSelectionnee.value = caisse
  afficherModal.value = true
}

const fermerModal = () => {
  afficherModal.value = false
  caisseSelectionnee.value = null
}

const obtenirItemAleatoire = () => {
  if (!itemsDispo.value.length) return null
  const index = Math.floor(Math.random() * itemsDispo.value.length)
  return itemsDispo.value[index]
}

const preparerRoulette = (itemFinal) => {
  const liste = []

  // on remplit la piste avec des items random
  // et on force l'item gagne a l'index gagnant
  for (let i = 0; i < 60; i += 1) {
    const base = i === INDEX_GAGNANT ? itemFinal : (obtenirItemAleatoire() || itemFinal)
    liste.push({
      cle: `${i}-${base.id || base.nom || 'item'}`,
      nom: base.nom || 'item',
      prix: Number(base.prix || 0),
      image: base.image || ''
    })
  }

  cartesRoulette.value = liste
}

const lancerAnimation = async (itemFinal) => {
  itemGagne.value = itemFinal
  preparerRoulette(itemFinal)

  afficherAnimation.value = true
  animationEnCours.value = true
  offsetRoulette.value = 0
  pisteTransition.value = 'none'

  await nextTick()
  await attendreFrame()

  const fenetre = fenetreRef.value
  const marqueur = marqueurRef.value
  const piste = fenetre?.querySelector('.roulette-piste')
  const carteGagnante = piste?.querySelector(`[data-idx="${INDEX_GAGNANT}"]`)

  if (!fenetre || !marqueur || !piste || !carteGagnante) {
    animationEnCours.value = false
    return
  }

  const rectMarqueur = marqueur.getBoundingClientRect()
  const rectCarte = carteGagnante.getBoundingClientRect()
  const centreMarqueur = rectMarqueur.left + (rectMarqueur.width / 2)
  const centreCarte = rectCarte.left + (rectCarte.width / 2)

  // calcul cle: on deplace la piste pr que la carte gagnee tombe pile sous la barre
  const cible = centreCarte - centreMarqueur

  // force un vrai etat initial avant de poser la transition
  offsetRoulette.value = 0
  await attendreFrame()

  pisteTransition.value = 'transform 5.2s cubic-bezier(0.08, 0.72, 0.12, 1)'
  await attendreFrame()
  offsetRoulette.value = cible

  // petite marge au dessus de 5.2s pr etre sur que l'anim est finie
  setTimeout(() => {
    animationEnCours.value = false
  }, 5400)
}

const fermerAnimation = () => {
  if (animationEnCours.value) return
  afficherAnimation.value = false
  itemGagne.value = null
  cartesRoulette.value = []
}

const acheter = async () => {
  // fix bug: si items pas encore charges, on recharge avant achat
  if (!itemsDispo.value.length) {
    await chargerItemsPourCaisses()
  }

  if (!itemsDispo.value.length) {
    alert('items indispo pr le moment, reessaie dans 2 sec')
    return
  }

  // le drop est calcule ici avec les vraies proba du store
  const resultat = await store.acheterCaisse(caisseSelectionnee.value, itemsDispo.value)
  if (!resultat.ok) {
    alert(resultat.message)
    return
  }

  fermerModal()
  await lancerAnimation(resultat.item)
}

const chargerItemsPourCaisses = async () => {
  chargementItems.value = true
  try {
    itemsDispo.value = await recupererSneakers(NB_ITEMS_API)
  } catch {
    itemsDispo.value = []
  } finally {
    chargementItems.value = false
  }
}

onMounted(() => {
  chargerItemsPourCaisses()
})
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
.btn-caisse { background: none; border: none; cursor: pointer; padding: 0; }
.img-caisse { width: 100%; height: auto; border-radius: 10px; transition: 0.2s; }
.btn-caisse:hover .img-caisse { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(156, 39, 176, 0.3); }
.nom-caisse { display: block; margin-top: 0.8rem; color: #fff; font-weight: 600; text-align: center; }
.prix-caisse { display: block; margin-top: 0.3rem; color: #ffb400; font-weight: 700; text-align: center; }

.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-contenu { background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 12px; padding: 2rem; max-width: 400px; text-align: center; }
.modal-contenu h2 { color: #ffb400; margin-bottom: 1rem; }
.modal-contenu p { color: #cfcfcf; margin-bottom: 1.5rem; }
.modal-boutons { display: flex; gap: 1rem; justify-content: center; }
.btn-annuler { padding: 0.7rem 1.5rem; background: #1a1a1a; color: #fff; border: 1px solid #333; border-radius: 8px; cursor: pointer; font-weight: 600; transition: 0.2s; }
.btn-annuler:hover { background: #2a2a2a; }
.btn-confirmer { padding: 0.7rem 1.5rem; background: linear-gradient(135deg, #ffb400, #9c27b0); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: 0.2s; }
.btn-confirmer:hover { transform: scale(1.05); }

.roulette-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88); display: flex; align-items: center; justify-content: center; z-index: 1200; padding: 1rem; }
.roulette-boite { width: min(920px, 100%); background: #0f0f0f; border: 1px solid #222; border-radius: 12px; padding: 1rem; }
.roulette-boite h2 { margin: 0 0 1rem; color: #ffb400; text-transform: lowercase; }
.roulette-zone { position: relative; }
.roulette-marqueur { position: absolute; top: -6px; bottom: -6px; left: 50%; width: 3px; background: linear-gradient(180deg, #ffb400, #9c27b0); transform: translateX(-50%); z-index: 2; border-radius: 999px; box-shadow: 0 0 18px rgba(255, 180, 0, 0.5); }
.roulette-fenetre { overflow: hidden; border: 1px solid #222; border-radius: 10px; background: #111; }
.roulette-piste { display: flex; gap: 10px; padding: 10px; }
.roulette-carte { width: 130px; min-width: 130px; background: #161616; border: 1px solid #2a2a2a; border-radius: 8px; padding: 0.5rem; }
.roulette-gagnant { border-color: #ffb400; box-shadow: 0 0 18px rgba(255, 180, 0, 0.35); }
.roulette-img { width: 100%; height: 80px; object-fit: cover; border-radius: 6px; display: block; margin-bottom: 0.4rem; }
.roulette-img-vide { width: 100%; height: 80px; border-radius: 6px; margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: center; color: #777; background: #1a1a1a; }
.roulette-nom { color: #fff; font-size: 0.78rem; line-height: 1.2; min-height: 30px; }
.roulette-prix { color: #ffb400; font-size: 0.82rem; font-weight: 700; margin-top: 0.2rem; }
.roulette-resultat { margin-top: 0.9rem; text-align: center; color: #fff; }
.roulette-resultat p { margin: 0 0 0.25rem; color: #cfcfcf; }
.btn-fermer-roulette { margin-top: 0.9rem; width: 100%; padding: 0.8rem; background: #1a1a1a; border: 1px solid #333; color: #fff; border-radius: 8px; cursor: pointer; }
.btn-fermer-roulette:disabled { opacity: 0.5; cursor: not-allowed; }

@media (max-width: 800px) {
  .stats, .grille-boxes { grid-template-columns: 1fr; }
}
</style>
