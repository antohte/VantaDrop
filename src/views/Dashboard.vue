<template>
  <header class="h">
    <div class="c">
      <img :src="l" alt="Logo" class="lg">
      <div></div>
    </div>
  </header>

  <main class="m">
    <div class="c">
      <input v-model="q" type="text" placeholder="Search..." class="sb">
      <section class="s">
        <h2>Featured</h2>
        <div class="g"></div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import l from '../assets/LogoVantaDrop.jpg'

const q = ref('')
</script>

<style scoped>
.h { padding: 1.5rem 0; border-bottom: 1px solid #1a1a1a; position: sticky; top: 0; z-index: 99; }
.h .c { max-width: 1440px; margin: 0 auto; padding: 0 1.5rem; display: flex; justify-content: space-between; align-items: center; }
.lg { height: 80px; }
.m { flex: 1; padding: 3rem 0; }
.c { max-width: 1440px; margin: 0 auto; padding: 0 1.5rem; }
.sb { width: 100%; max-width: 520px; padding: 1.2rem; background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 8px; color: white; }
.sb:focus { outline: none; border-color: #ffb400; }
.s { margin-bottom: 3rem; }
.s h2 { color: #ffb400; text-transform: uppercase; margin-bottom: 2rem; }
.g { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 2rem; }
</style>

<style scoped>
/* Structure principale */
.dashboard {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.subtitle {
  color: #888;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin: 0;
}

/* Search Section */
.search-section {
  margin-bottom: 4rem;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 520px;
  padding: 1.2rem 1.8rem;
  background-color: #0f0f0f;
  border: 1px solid #1a1a1a;
  border-radius: 12px;
  color: #ffffff;
  font-size: 0.95rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.search-input:hover {
  border-color: rgba(201, 169, 97, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.search-input:focus {
  outline: none;
  border-color: #c9a961;
  box-shadow: 0 0 0 3px rgba(201, 169, 97, 0.1), 0 4px 16px rgba(201, 169, 97, 0.15);
  background-color: #121212;
}

.search-input::placeholder {
  color: #555;
  letter-spacing: 0.3px;
}

/* Sections */
.featured-section,
.themed-section {
  margin-bottom: 4rem;
}

.featured-section h2,
.themed-section h2 {
  margin: 0 0 2rem 0;
  color: #c9a961;
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Boxes Grid */
.boxes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
}

.box-card {
  background-color: #0f0f0f;
  border: 1px solid #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.box-card:hover {
  border-color: #c9a961;
  background-color: #151515;
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(201, 169, 97, 0.15), 0 0 20px rgba(201, 169, 97, 0.1);
}

.box-card.featured {
  grid-column: span 1;
}

.box-image {
  width: 100%;
  height: 160px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-bottom: 1px solid #1a1a1a;
  transition: all 0.4s ease;
}

.box-card:hover .box-image {
  background: linear-gradient(135deg, #c9a961 0%, #2a2a2a 100%);
}

.box-card h3 {
  margin: 0;
  padding: 1.2rem 1.2rem 0 1.2rem;
  font-size: 1rem;
  color: #ffffff;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.box-card .price {
  margin: 0.8rem 1.2rem 1.2rem 1.2rem;
  font-size: 1.1rem;
  color: #c9a961;
  font-weight: 600;
  letter-spacing: 0.1px;
}

/* Responsive */
@media (max-width: 768px) {
  .logo-section {
    flex: 1;
  }

  .subtitle {
    display: none;
  }

  .boxes-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1.5rem;
  }

  .featured-section h2,
  .themed-section h2 {
    font-size: 1.1rem;
  }

  .search-input {
    max-width: 100%;
    padding: 1rem 1.4rem;
  }
}
</style>
