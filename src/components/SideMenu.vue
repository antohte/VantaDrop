<template>
  <div class="mw">
    <button class="mb" :class="{ a: is }">☰</button>
    <div class="dm" :class="{ a: is }">
      <button @click="() => { r.push('/profile'); is = false }">Profile</button>
      <button @click="() => { r.push('/inventory'); is = false }">Items</button>
      <button @click="() => { if (confirm('Logout?')) { auth.clearAuthToken(); s.resetStore(); r.push('/'); is = false } }">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import s from '../stores/userStore'
import * as auth from '../services/discordAuth'

const r = useRouter()
const is = ref(false)
</script>

<style scoped>
.mw { position: relative; z-index: 1000; }
.mb { width: 40px; height: 40px; background: transparent; border: 1px solid #ffb400; border-radius: 8px; cursor: pointer; color: #ffb400; }
.mb:hover { background: rgba(255, 180, 0, 0.1); }
.dm { position: absolute; top: calc(100% + 12px); right: 0; width: 200px; background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 8px; display: none; flex-direction: column; }
.dm.a { display: flex; }
.dm button { width: 100%; padding: 1rem; border: none; background: none; color: white; cursor: pointer; border-bottom: 1px solid #1a1a1a; text-align: left; }
.dm button:last-child { border: none; }
.dm button:hover { background: rgba(255, 180, 0, 0.1); }

.menu-wrapper {
  position: relative;
  z-index: 1000;
}

/* Menu Button */
.menu-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 1px solid #c9a961;
  border-radius: 8px;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.menu-button:hover {
  background-color: rgba(201, 169, 97, 0.08);
  box-shadow: 0 4px 16px rgba(201, 169, 97, 0.15);
}

.menu-button.active {
  background-color: rgba(201, 169, 97, 0.12);
  box-shadow: 0 4px 20px rgba(201, 169, 97, 0.2);
}

.menu-button span {
  width: 20px;
  height: 2px;
  background-color: #c9a961;
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.menu-button.active span:nth-child(1) {
  transform: rotate(45deg) translateY(8px);
}

.menu-button.active span:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.menu-button.active span:nth-child(3) {
  transform: rotate(-45deg) translateY(-8px);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 260px;
  background-color: #0f0f0f;
  border: 1px solid #1a1a1a;
  border-radius: 12px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(201, 169, 97, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-12px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  overflow: hidden;
}

.dropdown-menu.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.menu-nav {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  list-style: none;
}

.menu-item {
  width: 100%;
  padding: 1.1rem 1.4rem;
  background-color: transparent;
  color: #ffffff;
  border: none;
  border-bottom: 1px solid #1a1a1a;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 400;
  text-align: left;
  transition: all 0.25s ease;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background-color: rgba(201, 169, 97, 0.08);
  color: #c9a961;
  padding-left: 1.6rem;
}

.menu-item.logout {
  color: #888;
  border-top: 1px solid #1a1a1a;
  margin-top: 0.4rem;
  padding-top: 1rem;
}

.menu-item.logout:hover {
  background-color: rgba(255, 255, 255, 0.03);
  color: #aaa;
  border-top-color: #aaa;
}
</style>
