<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo-section">
            <img :src="logoVantaDrop" alt="VantaDrop" class="logo-vantadrop">
            <p class="subtitle">Plateforme Premium de Case Opening</p>
          </div>
          
          <!-- Bouton Connexion -->
          <button class="btn-discord">
            <span>Connexion</span>
            <img :src="logoDiscord" alt="Discord" class="discord-logo">
          </button>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <!-- Section Accueil -->
        <section class="welcome-section" v-if="!userStore.user.isAuthenticated">
          <div class="welcome-content">
            <h2>Bienvenue sur VantaDrop</h2>
            <p>Le meilleur site de case opening</p>
          </div>
        </section>

        <!-- Section Profil -->
        <section class="state-section" v-if="userStore.user.isAuthenticated">
          <h2>Profil</h2>
          
          <div class="profile-info">
            <div class="info-item">
              <span class="label">Pseudo:</span>
              <p class="value">{{ userStore.user.username }}</p>
            </div>
            <div class="info-item">
              <span class="label">Solde:</span>
              <p class="value">{{ userStore.balance.value.toLocaleString() }}€</p>
            </div>
            <div class="info-item">
              <span class="label">Items:</span>
              <p class="value">{{ userStore.inventory.length }}</p>
            </div>
          </div>
        </section>

        <!-- Section Items Disponibles -->
        <section class="items-section" v-if="userStore.user.isAuthenticated">
          <h2>Items Disponibles (0)</h2>
          
          <div class="items-grid">
            <div class="empty-state">
              <p>Aucun item disponible pour le moment</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import userStore from './stores/userStore'
import logoVantaDrop from './assets/LogoVantaDrop.jpg'
import logoDiscord from './assets/logo-discord.png'

</script>

<style scoped>
/* Structure principale */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* En-tete avec info utilisateur */
.header {
  padding: var(--spacing-lg) 0;
  border-bottom: 1px solid var(--vanta-border);
  background: linear-gradient(135deg, #0a0a0a, var(--vanta-black));
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-lg);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.logo-vantadrop {
  height: 120px;
  width: auto;
  object-fit: contain;
  background-color: var(--vanta-black);
  padding: var(--spacing-md);
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
}

.header h1 {
  margin-bottom: var(--spacing-sm);
  background: linear-gradient(135deg, var(--rarity-legendary), var(--rarity-rare));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: var(--vanta-text-muted);
  font-size: var(--font-size-lg);
}

/* Bouton Discord */
.btn-discord {
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: #1a1a1a;
  color: white;
  border: 1px solid #333;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 600;
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.discord-logo {
  height: 20px;
  width: 20px;
}

.btn-discord:hover {
  background-color: #2a2a2a;
  border-color: #5865F2;
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(88, 101, 242, 0.3);
}

/* Contenu principal */
.main {
  flex: 1;
  padding: var(--spacing-2xl) 0;
}

/* Sections */
.preview-section,
.state-section,
.items-section,
.welcome-section {
  margin-bottom: var(--spacing-2xl);
}

.preview-section h2,
.state-section h2,
.items-section h2,
.welcome-section h2 {
  margin-bottom: var(--spacing-lg);
  color: var(--vanta-text-primary);
}

/* Section de bienvenue */
.welcome-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.welcome-content {
  text-align: center;
}

.welcome-content h2 {
  font-size: var(--font-size-3xl);
  background: linear-gradient(135deg, #ffb400, #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-md);
}

.welcome-content p {
  font-size: var(--font-size-2xl);
  background: linear-gradient(135deg, #ffb400, #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Grille des raretes */
.rarity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

/* Carte de rarete */
.rarity-card {
  padding: var(--spacing-lg);
  background-color: var(--vanta-surface);
  border: 1px solid var(--vanta-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.rarity-card:hover {
  border-color: currentColor;
  transform: translateY(-4px);
}

/* Indicateur de couleur */
.rarity-dot {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-bottom: var(--spacing-md);
  box-shadow: 0 0 20px currentColor;
}

.rarity-card.common .rarity-dot {
  background-color: var(--rarity-common);
  color: var(--rarity-common);
}

.rarity-card.rare .rarity-dot {
  background-color: var(--rarity-rare);
  color: var(--rarity-rare);
}

.rarity-card.epic .rarity-dot {
  background-color: var(--rarity-epic);
  color: var(--rarity-epic);
}

.rarity-card.legendary .rarity-dot {
  background-color: var(--rarity-legendary);
  color: var(--rarity-legendary);
}

.rarity-card h3 {
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
}

.rarity-card p {
  font-size: var(--font-size-sm);
  color: var(--vanta-text-muted);
}

/* Profil info */
.profile-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  background-color: var(--vanta-surface);
  padding: var(--spacing-lg);
  border: 1px solid var(--vanta-border);
  border-radius: var(--radius-lg);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.info-item .label {
  color: var(--vanta-text-muted);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-item .value {
  color: var(--vanta-text-primary);
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin: 0;
}

/* Grille de state */
.state-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.state-card {
  background-color: var(--vanta-surface);
  border: 1px solid var(--vanta-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  transition: all var(--transition-base);
}

.state-card:hover {
  border-color: var(--rarity-legendary);
}

.state-card h3 {
  margin-bottom: var(--spacing-md);
  color: var(--vanta-text-secondary);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.state-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  background: linear-gradient(135deg, var(--rarity-legendary), var(--rarity-rare));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: var(--spacing-md) 0;
}

.state-desc {
  font-size: var(--font-size-sm);
  color: var(--vanta-text-muted);
}

/* Stats de rarete */
.rarity-stats {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.stat-row {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
}

.stat-row span {
  color: var(--vanta-text-secondary);
}

.stat-row strong {
  color: var(--vanta-text-primary);
  font-weight: 700;
}

/* Boutons */
.btn-action {
  margin-top: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  background: linear-gradient(135deg, var(--rarity-legendary), #ff9500);
  color: #000;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 600;
  font-size: var(--font-size-sm);
  transition: all var(--transition-base);
}

.btn-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(255, 180, 0, 0.4);
}

.test-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.btn-primary,
.btn-secondary {
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 600;
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all var(--transition-base);
}

.btn-primary {
  background: linear-gradient(135deg, var(--rarity-legendary), #ff9500);
  color: #000;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(255, 180, 0, 0.4);
}

.btn-secondary {
  background-color: var(--vanta-surface);
  color: var(--rarity-rare);
  border: 1px solid var(--rarity-rare);
}

.btn-secondary:hover {
  background-color: rgba(0, 212, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
}

/* Grille d'items */
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--vanta-text-muted);
  font-size: var(--font-size-lg);
}

.item-card {
  background-color: var(--vanta-surface);
  border: 1px solid var(--vanta-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
}

.item-card:hover {
  transform: translateY(-8px);
  border-color: currentColor;
}

.item-image {
  width: 100%;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-content {
  padding: var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-card h3 {
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
  color: var(--vanta-text-primary);
}

.brand {
  font-size: var(--font-size-sm);
  color: var(--vanta-text-secondary);
  margin-bottom: var(--spacing-sm);
}

.description {
  font-size: var(--font-size-sm);
  color: var(--vanta-text-muted);
  flex: 1;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--vanta-border);
}

.price {
  font-weight: 700;
  font-size: var(--font-size-lg);
}

.rarity-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
}

.rarity-badge.common {
  background-color: var(--rarity-common);
  color: #fff;
}

.rarity-badge.rare {
  background-color: var(--rarity-rare);
  color: #000;
}

.rarity-badge.epic {
  background-color: var(--rarity-epic);
  color: #fff;
}

.rarity-badge.legendary {
  background-color: var(--rarity-legendary);
  color: #000;
}

/* Rarete des cartes */
.item-card.common {
  color: var(--rarity-common);
}

.item-card.rare {
  color: var(--rarity-rare);
}

.item-card.rare:hover {
  box-shadow: 0 0 25px rgba(0, 212, 255, 0.2);
}

.item-card.epic {
  color: var(--rarity-epic);
}

.item-card.epic:hover {
  box-shadow: 0 0 30px rgba(156, 39, 176, 0.2);
}

.item-card.legendary {
  color: var(--rarity-legendary);
  border-color: var(--rarity-legendary);
}

.item-card.legendary:hover {
  box-shadow: 0 0 40px rgba(255, 180, 0, 0.3);
  background: rgba(255, 180, 0, 0.03);
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .test-actions {
    flex-direction: column;
  }

  .items-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
