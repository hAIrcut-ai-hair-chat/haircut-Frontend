<script setup>
import { ref } from 'vue'
import LateralBar from '../components/LateralBar.vue'

const settings = ref([
  { id: 1, name: 'Notificações', enabled: true },
  { id: 2, name: 'Tema escuro', enabled: false },
  { id: 3, name: 'Privacidade', enabled: true },
  { id: 4, name: 'Salvar histórico', enabled: false },
  { id: 5, name: 'Auto-play vídeos', enabled: true },
])

const toggleSetting = (setting) => {
  setting.enabled = !setting.enabled
}

const lightboxContent = ref(null)
const openLightbox = (content) => lightboxContent.value = content
const closeLightbox = () => lightboxContent.value = null
</script>

<template>
  <div class="settings-layout">
    <main class="main-content">
      <div v-if="settings.length === 0" class="empty-settings">
        <p>Nenhuma configuração encontrada.</p>
      </div>
      <div v-else class="settings-grid">
        <div v-for="setting in settings" :key="setting.id" class="grid-item">
          <span class="setting-name">{{ setting.name }}</span>
          <div class="actions">
            <div class="toggle-switch" :class="{ on: setting.enabled }" @click="toggleSetting(setting)">
              <div class="toggle-knob"></div>
            </div>
            <button class="info-btn" @click="openLightbox(setting.name)">ℹ️</button>
          </div>
        </div>
      </div>
    </main>
    <LateralBar />

    <div v-if="lightboxContent" class="lightbox-overlay" @click.self="closeLightbox">
      <div class="lightbox-box">
        <p>{{ lightboxContent }}</p>
        <button class="close-btn" @click="closeLightbox">✕</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
  position: relative;
  background: #ffffff;
}
.main-content {
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  transition: margin-right 0.3s ease;
}
:deep(.lateral-bar.expanded) ~ .main-content {
  margin-right: 280px;
}
.empty-settings {
  text-align: center;
  padding: 3rem 1rem;
  font-size: 1.1rem;
  background: #fff;
  border-radius: 12px;
  margin: 2rem 0;
  color: #333;
}
.settings-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
.grid-item {
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;
}
.grid-item:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
.setting-name { font-weight: 500; font-size: 1rem; color: #262626; }
.actions { display: flex; align-items: center; gap: 1rem; }

.toggle-switch {
  width: 48px;
  height: 26px;
  border-radius: 999px;
  background: #ccc;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
}
.toggle-switch.on { background: #0095f6; }
.toggle-knob {
  width: 22px;
  height: 22px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: left 0.2s ease;
}
.toggle-switch.on .toggle-knob { left: 24px; }

.info-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #8e8e8e;
  transition: transform 0.2s ease;
}
.info-btn:hover { transform: scale(1.2); color: #262626; }

.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;
}
.lightbox-box {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  color: #262626;
  font-size: 1rem;
}
.close-btn {
  margin-top: 1rem;
  background: #262626;
  color: white;
  border: none;
  font-size: 1.2rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.close-btn:hover { background: #444; }

@media (max-width: 768px) {
  .main-content { padding: 2rem 0.5rem; }
}
</style>