<template>
  <header class="h">
    <div class="c">
      <img :src="l1" alt="Logo" class="lg">
      <button @click="login" v-if="!s.user.isAuthenticated" class="b">Login to Discord</button>
      <button @click="logout" v-if="s.user.isAuthenticated" class="b">{{ s.user.username }}</button>
    </div>
  </header>

  <main class="m">
    <div class="c">
      <section v-if="!s.user.isAuthenticated" class="ws">
        <h2>Welcome to VantaDrop</h2>
        <p>Best Case Opening Platform</p>
      </section>

      <section v-if="s.user.isAuthenticated" class="ps">
        <h2>Profile</h2>
        <div class="pi">
          <div>Pseudo: {{ s.user.username }}</div>
          <div>Balance: {{ s.balance.value }}€</div>
          <div>Items: {{ s.inventory.length }}</div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import s from '../stores/userStore'
import * as auth from '../services/discordAuth'
import l1 from '../assets/LogoVantaDrop.jpg'

const r = useRouter()

const login = () => {
  window.location.href = auth.getDiscordAuthUrl()
}

const logout = () => {
  if (confirm('Logout?')) {
    auth.clearAuthToken()
    s.resetStore()
    r.push('/')
  }
}

onMounted(() => {
  if (s.user.isAuthenticated) r.push('/dashboard')
})
</script>

<style scoped>
.h {
  padding: 1.5rem;
  border-bottom: 1px solid #1a1a1a;
  background: #0a0a0a;
}

.c { max-width: 1440px; margin: 0 auto; padding: 0 1.5rem; }

.h .c { display: flex; justify-content: space-between; align-items: center; }

.lg { height: 100px; }

.b {
  padding: 0.6rem 1.2rem;
  background: #1a1a1a;
  color: white;
  border: 1px solid #333;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.b:hover { background: #2a2a2a; box-shadow: 0 0 20px rgba(88, 101, 242, 0.3); }

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

