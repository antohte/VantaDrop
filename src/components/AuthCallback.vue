<template>
  <div class="ac">
    <div v-if="l" class="ls">Loading...</div>
    <div v-else-if="e" class="es">
      <h2>Error</h2>
      <p>{{ e }}</p>
    </div>
    <div v-else>
      <h2>Welcome {{ u.username }}!</h2>
      <p>Redirecting...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as auth from '../services/discordAuth'
import s from '../stores/userStore'

const r = useRouter()
const l = ref(true)
const e = ref(null)
const u = ref({})

onMounted(async () => {
  try {
    const t = auth.getTokenFromFragment()
    if (!t) throw new Error('No token')
    
    auth.saveAuthToken(t)
    const user = await auth.fetchDiscordUser(t.accessToken)
    u.value = user
    
    s.setUserInfo({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      isAuthenticated: true
    })
    
    l.value = false
    r.push('/dashboard')
  } catch (err) {
    e.value = err.message
    l.value = false
  }
})
</script>

<style scoped>
.ac { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0a; }
.ls { text-align: center; color: white; }
.es { text-align: center; color: #ff4545; }

.auth-callback {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
}

.callback-content {
  text-align: center;
  padding: 2rem;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 180, 0, 0.3);
  border-top-color: #ffb400;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  color: #fff;
  font-size: 1.2rem;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Error State */
.error-state {
  background-color: rgba(255, 69, 69, 0.1);
  border: 1px solid rgba(255, 69, 69, 0.3);
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
}

.error-state h2 {
  color: #ff4545;
  margin-bottom: 1rem;
}

.error-state p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}

/* Success State */
.success-state {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(156, 39, 176, 0.1));
  border: 1px solid rgba(0, 212, 255, 0.3);
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
}

.success-state h2 {
  background: linear-gradient(135deg, #00d4ff, #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.success-state p {
  color: rgba(255, 255, 255, 0.7);
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 1rem 0;
  border: 2px solid #ffb400;
}

/* Button */
.btn-primary {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #ffb400, #9c27b0);
  color: #000;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(255, 180, 0, 0.4);
}
</style>
