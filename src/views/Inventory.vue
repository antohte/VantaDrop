<template>
  <header class="h">
    <div class="c">
      <button @click="() => r.push('/dashboard')" class="bb">← Back</button>
      <h1>Items</h1>
      <div></div>
    </div>
  </header>

  <main class="m">
    <div class="c">
      <div v-if="s.inventory.length === 0" class="es">
        <p>No items yet</p>
      </div>
      <div v-else class="ig">
        <div v-for="(item, i) in s.inventory" :key="i" class="ii">
          <h3>{{ item.name }}</h3>
          <p>{{ item.value }}€</p>
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
.c { max-width: 1440px; margin: 0 auto; padding: 0 1.5rem; }
.h .c { display: flex; justify-content: space-between; align-items: center; }
.bb { padding: 0.6rem 1.2rem; background: transparent; color: white; border: 1px solid #ffb400; border-radius: 6px; cursor: pointer; }
.bb:hover { background: rgba(255, 180, 0, 0.1); }
.m { flex: 1; padding: 2rem 0; }
.es { text-align: center; padding: 3rem; color: #666; }
.ig { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; }
.ii { background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 8px; padding: 1rem; }
.ii h3 { margin: 0 0 0.5rem 0; color: white; }
.ii p { margin: 0; color: #ffb400; }
</style>
</script>

<style scoped>
/* Structure principale */
.inventory-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #0a0a0a;
}

/* Inventory Section */
.inventory-section {
  margin-bottom: 3rem;
}

/* Empty State */
.empty-inventory {
  text-align: center;
  padding: 3rem 2rem;
  background-color: #0f0f0f;
  border: 1px dashed #1a1a1a;
  border-radius: 8px;
  color: #666;
}

.empty-inventory p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.empty-text-secondary {
  font-size: 0.9rem !important;
  color: #555 !important;
}

/* Inventory Grid */
.inventory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.inventory-item {
  background-color: #0f0f0f;
  border: 1px solid #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.inventory-item:hover {
  border-color: #c9a961;
  background-color: #151515;
  box-shadow: 0 4px 12px rgba(201, 169, 97, 0.15);
}

.item-image {
  width: 100%;
  height: 160px;
  background: linear-gradient(135deg, #1a1a1a 0%, #262626 100%);
  border-bottom: 1px solid #1a1a1a;
}

.item-info {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-info h3 {
  margin: 0 0 0.5rem 0;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.item-value {
  margin: 0.5rem 0 0 0;
  color: #c9a961;
  font-size: 0.9rem;
  font-weight: 600;
}

.item-date {
  margin: 0.5rem 0 0 0;
  color: #555;
  font-size: 0.75rem;
  margin-top: auto;
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.stat-box {
  background-color: #0f0f0f;
  border: 1px solid #1a1a1a;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-box:hover {
  border-color: #c9a961;
  background-color: #151515;
}

.stat-box h3 {
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

  .inventory-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }

  .item-image {
    height: 120px;
  }

  .item-info {
    padding: 0.75rem;
  }

  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
