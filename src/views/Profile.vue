<template>
  <header class="h">
    <div class="c">
      <button @click="() => r.back()" class="bb">← Back</button>
      <h1>Profile</h1>
      <div></div>
    </div>
  </header>

  <main class="m">
    <div class="c">
      <div class="pc">
        <div class="av">
          <img :src="s.user.avatar" :alt="s.user.username" v-if="s.user.avatar">
          <h2>{{ s.user.username }}</h2>
        </div>
        <div class="st">
          <div class="sc">
            <h3>Balance</h3>
            <p>{{ s.balance.value }}€</p>
          </div>
          <div class="sc">
            <h3>Items</h3>
            <p>{{ s.inventory.length }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import s from '../stores/userStore'

const r = useRouter()
</script>

<style scoped>
.h { padding: 1.5rem 0; border-bottom: 1px solid #1a1a1a; position: sticky; top: 0; z-index: 99; }
.h .c { max-width: 1440px; margin: 0 auto; padding: 0 1.5rem; display: flex; justify-content: space-between; align-items: center; }
.bb { padding: 0.6rem 1.2rem; background: transparent; color: white; border: 1px solid #ffb400; border-radius: 6px; cursor: pointer; }
.bb:hover { background: rgba(255, 180, 0, 0.1); }
.m { flex: 1; padding: 2rem 0; }
.c { max-width: 1440px; margin: 0 auto; padding: 0 1.5rem; }
.pc { background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 8px; padding: 2.5rem; text-align: center; }
.av { margin-bottom: 2rem; }
.av img { width: 100px; height: 100px; border-radius: 50%; border: 2px solid #ffb400; margin-bottom: 1rem; }
.av h2 { color: white; margin: 0; }
.st { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
.sc { background: #151515; border: 1px solid #1a1a1a; border-radius: 6px; padding: 1.5rem; text-align: center; }
.sc:hover { border-color: #ffb400; }
.sc h3 { color: white; margin: 0 0 1rem 0; font-size: 0.85rem; text-transform: uppercase; }
.sc p { color: #ffb400; font-size: 1.5rem; margin: 0; }
</style>

<style scoped>
/* Structure principale */
.profile-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #0a0a0a;
}

/* Profile Card */
.profile-card {
  background-color: #0f0f0f;
  border: 1px solid #1a1a1a;
  border-radius: 8px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

/* Avatar Section */
.avatar-section {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #1a1a1a;
}

.large-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #c9a961;
  object-fit: cover;
  margin-bottom: 1.5rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.avatar-section h2 {
  margin: 0 0 1rem 0;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.user-id {
  margin: 0;
  color: #666;
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.2px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: #151515;
  border: 1px solid #1a1a1a;
  border-radius: 6px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: #c9a961;
  background-color: #121212;
}

.stat-card h3 {
  margin: 0 0 1rem 0;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.stat-value {
  margin: 0;
  color: #c9a961;
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.2px;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    gap: 1rem;
  }

  .header h1 {
    font-size: 1.2rem;
  }

  .profile-card {
    padding: 1.5rem;
  }

  .large-avatar {
    width: 80px;
    height: 80px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
</style>
