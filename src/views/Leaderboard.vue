<template>
  <EnteteSite />
  
  <main class="m">
    <div class="container">
      <button class="btn-retour" @click="retour">← Retour</button>
      
      <h2>Leaderboard</h2>
      
      <div v-if="chargement" class="msg">Chargement...</div>
      <div v-else-if="erreur" class="msg-erreur">{{ erreur }}</div>
      
      <table v-else class="tableau">
        <thead>
          <tr>
            <th>#</th>
            <th>Pseudo</th>
            <th>Niveau</th>
            <th>XP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in leaderboard" :key="user.position" :class="'rang-' + user.position">
            <td class="pos">{{ user.position }}</td>
            <td class="pseudo">
              <img v-if="user.avatar" :src="user.avatar" :alt="user.pseudo" class="av">
              <span>{{ user.pseudo }}</span>
            </td>
            <td>{{ user.niveau }}</td>
            <td>{{ user.xp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EnteteSite from '../components/EnteteSite.vue'
import { obtenirLeaderboard } from '../services/profilApi'

const router = useRouter()
const leaderboard = ref([])
const chargement = ref(true)
const erreur = ref(null)

const retour = () => router.back()

onMounted(async () => {
  try {
    leaderboard.value = await obtenirLeaderboard()
  } catch (err) {
    erreur.value = err.message || 'Erreur lors du chargement'
  } finally {
    chargement.value = false
  }
})
</script>

<style scoped>
.m { flex: 1; padding: 3rem 0; }
.container { max-width: 1440px; margin: 0 auto; padding: 0 1.5rem; }

h2 { font-size: 2rem; margin-bottom: 2rem; color: #fff; }

.btn-retour {
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  margin-bottom: 1.5rem;
  background: #1a1a1a;
  color: #fff;
  border: 1px solid #333;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-retour:hover {
  background: #2a2a2a;
  border-color: #ffb400;
  color: #ffb400;
}

.msg { text-align: center; color: #888; padding: 2rem; }
.msg-erreur { text-align: center; color: #ff6b6b; padding: 2rem; }

.tableau {
  width: 100%;
  border-collapse: collapse;
  background: #0f0f0f;
  border: 1px solid #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
}

.tableau thead { background: #1a1a1a; }
.tableau th {
  padding: 1rem;
  text-align: left;
  color: #ffb400;
  font-weight: 700;
  border-bottom: 1px solid #333;
}

.tableau td {
  padding: 1rem;
  color: #ccc;
  border-bottom: 1px solid #1a1a1a;
}

.tableau tr:hover { background: #141414; }

.pos {
  font-weight: 700;
  color: #fff;
  width: 50px;
}

.rang-1 .pos { color: #ffd700; font-size: 1.2rem; }
.rang-2 .pos { color: #c0c0c0; }
.rang-3 .pos { color: #cd7f32; }

.pseudo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.av {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .container { padding: 1.5rem; }
  h2 { font-size: 1.5rem; }
}
</style>
