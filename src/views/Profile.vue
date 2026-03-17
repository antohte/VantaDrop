<template>
  <EnteteSite />

  <main class="m">
    <div class="c">
      <section class="pc">
        <div class="entete-profil">
          <img :src="s.utilisateur.avatar" :alt="s.utilisateur.username" v-if="s.utilisateur.avatar" class="av">
          <div v-else class="av-vide">{{ premiereLettre() }}</div>
          <h2>{{ s.utilisateur.username }}</h2>
        </div>

        <div class="grille-infos">
          <div class="bloc-info">
            <span class="label">Solde</span>
            <div class="valeur-solde">
              <strong>{{ s.solde.value }}€</strong>
              <button class="pb" title="Bientôt disponible">+</button>
            </div>
          </div>

          <div class="bloc-info">
            <span class="label">Caisses ouvertes</span>
            <strong>{{ s.caissesOuvertes.value }}</strong>
          </div>
        </div>

        <div class="actions">
          <button class="ib" @click="allerInventaire">Voir inventaire</button>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import EnteteSite from '../components/EnteteSite.vue'
import { useRouter } from 'vue-router'
import s from '../stores/userStore'

const r = useRouter()
const allerInventaire = () => r.push('/inventory')
const premiereLettre = () => (s.utilisateur.username || 'U').charAt(0).toUpperCase()
</script>

<style scoped>
.m { flex: 1; padding: 2rem 0; }
.c { max-width: 1440px; margin: 0 auto; padding: 0 1.5rem; }
.pc { max-width: 640px; margin: 0 auto; background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 8px; padding: 2rem; }
.entete-profil { display: flex; flex-direction: column; align-items: center; margin-bottom: 1.5rem; }
.av { width: 88px; height: 88px; border-radius: 50%; border: 2px solid #ffb400; margin-bottom: 1rem; }
.av-vide { width: 88px; height: 88px; border-radius: 50%; border: 2px solid #ffb400; background: #1a1a1a; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.2rem; margin-bottom: 1rem; }
h2 { margin: 0; text-align: center; background: linear-gradient(135deg, #ffb400, #9c27b0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.grille-infos { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
.bloc-info { background: #151515; border: 1px solid #1a1a1a; border-radius: 8px; padding: 1rem; }
.label { display: block; color: #bfbfbf; margin-bottom: 0.5rem; font-size: 0.9rem; }
.valeur-solde { display: flex; align-items: center; justify-content: space-between; }
.actions { display: flex; }
.pb { width: 24px; height: 24px; border: 1px solid #ffb400; border-radius: 50%; background: transparent; color: #ffb400; cursor: pointer; }
.ib { margin-top: 1.5rem; width: 100%; padding: 0.8rem; background: #1a1a1a; color: #fff; border: 1px solid #333; border-radius: 8px; cursor: pointer; font-weight: 600; }
.ib:hover { background: #2a2a2a; box-shadow: 0 0 20px rgba(88, 101, 242, 0.25); }

@media (max-width: 640px) {
  .grille-infos { grid-template-columns: 1fr; }
}
</style>
