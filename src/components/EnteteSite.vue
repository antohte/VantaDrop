<template>
  <header class="eh">
    <div class="c barre">
      <div class="gauche">
        <img :src="logo" alt="Logo" class="lg">
        <nav class="nav">
          <RouterLink to="/dashboard" class="lien">Caisses</RouterLink>
          <RouterLink to="/items" class="lien">Objets</RouterLink>
          <RouterLink to="/dashboard" class="lien">Classement</RouterLink>
        </nav>
      </div>

      <div class="droite">
        <button class="connexion" @click="connexion" v-if="!store.utilisateur.estConnecte">Connexion Discord</button>

        <div class="niveau" v-if="store.utilisateur.estConnecte">
          <span>Niv {{ store.niveau.value }}</span>
        </div>

        <button class="profil" @click="allerProfil" v-if="store.utilisateur.estConnecte">
          <img v-if="store.utilisateur.avatar" :src="store.utilisateur.avatar" :alt="store.utilisateur.username" class="av">
          <span v-else class="av-vide">{{ premiereLettre() }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router'
import store from '../stores/userStore'
import * as auth from '../services/discordAuth'
import logo from '../assets/LogoVantaDrop.jpg'

const nav = useRouter()
const allerProfil = () => nav.push('/profile')
const premiereLettre = () => (store.utilisateur.username || 'U').charAt(0).toUpperCase()
const connexion = () => {
  try {
    window.location.href = auth.obtenirUrlAuthDiscord()
  } catch (erreur) {
    alert(erreur.message)
  }
}
</script>

<style scoped>
.eh { padding: 1rem 1.2rem; }
.c { max-width: 1440px; margin: 0 auto; }
.barre {
  background: #0f0f0f;
  border: 1px solid #1a1a1a;
  border-radius: 12px;
  padding: 0.9rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.gauche { display: flex; align-items: center; gap: 1.2rem; min-width: 0; }
.droite { display: flex; align-items: center; gap: 0.6rem; }
.lg { height: 56px; border-radius: 8px; }
.nav { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.lien {
  color: #d8d8d8;
  font-size: 1rem;
  text-decoration: none;
  padding: 0.2rem 0.1rem;
  font-weight: 600;
}
.lien:hover { color: #ffffff; }
.niveau {
  background: #1a1a1a;
  border: 1px solid #333;
  color: #ffb400;
  border-radius: 999px;
  padding: 0.35rem 0.75rem;
  font-weight: 700;
  font-size: 0.85rem;
}
.connexion {
  padding: 0.6rem 1.2rem;
  background: #1a1a1a;
  color: #fff;
  border: 1px solid #333;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
.connexion:hover { background: #2a2a2a; box-shadow: 0 0 20px rgba(88, 101, 242, 0.25); }
.profil {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid #333;
  background: #1a1a1a;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
}
.profil:hover { border-color: #ffb400; }
.av { width: 100%; height: 100%; object-fit: cover; }
.av-vide { display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; width: 100%; height: 100%; }

@media (max-width: 900px) {
  .nav { gap: 0.6rem; }
  .lien { font-size: 0.85rem; }
  .lg { height: 48px; }
}
</style>