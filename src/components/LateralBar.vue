<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const isExpanded = ref(false)
const route = useRoute()

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="lateral-bar" :class="{ expanded: isExpanded }">
    <div class="top-section">
      
      <div class="haircut-symbol" @click="toggleExpanded">
        <i class="mdi mdi-hair-dryer"></i>
        <span v-if="isExpanded" class="symbol-text">HaircutAI</span>
      </div>

      <div class="buttons">

        <router-link 
          to="/new-chat"
          class="button"
          :class="{ active: route.path === '/new-chat' }"
        >
          <i class="mdi mdi-message-plus"></i>
          <span v-if="isExpanded" class="button-text">Novo chat</span>
        </router-link>

        <router-link 
          to="/images"
          class="button"
          :class="{ active: route.path === '/images' }"
        >
          <i class="mdi mdi-image-outline"></i>
          <span v-if="isExpanded" class="button-text">Suas imagens</span>
        </router-link>

        <router-link 
          to="/chat"
          class="button"
          :class="{ active: route.path === '/chat' }"
        >
          <i class="mdi mdi-chat"></i>
          <span v-if="isExpanded" class="button-text">Chats recentes</span>
        </router-link>

        <router-link 
          to="/feed"
          class="button"
          :class="{ active: route.path === '/feed' }"
        >
          <i class="mdi mdi-image-multiple"></i>
          <span v-if="isExpanded" class="button-text">Explore</span>
        </router-link>
      </div>
    </div>

    <div class="bottom-section">

      <router-link 
        to="/settings"
        class="button settings"
        :class="{ active: route.path === '/settings' }"
      >
        <i class="mdi mdi-cog"></i>
        <span v-if="isExpanded" class="button-text">Configurações</span>
      </router-link>

      <div 
        class="expand-collapse" 
        @click="toggleExpanded"
        :title="isExpanded ? 'Recolher menu' : 'Expandir menu'"
      >
        <i :class="isExpanded ? 'mdi mdi-chevron-left' : 'mdi mdi-chevron-right'"></i>
        <span v-if="isExpanded" class="button-text">Recolher</span>
      </div>
      

    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}

.lateral-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 80px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
  z-index: 1000;
  overflow: hidden;
  text-decoration: none;
}

.lateral-bar.expanded {
  width: 240px;
}

.top-section {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.haircut-symbol {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 20px 20px;
  margin-bottom: 24px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.haircut-symbol i {
  font-size: 20px;
  color: white;
  padding: 12px;
  border-radius: 12px;
  text-align: center;
}

.symbol-text {
  color: #f1f5f9;
  font-size: 1.15rem;
  font-weight: 700;
  opacity: 0;
  transition: opacity 0.2s ease;
  letter-spacing: 0.5px;
}

.lateral-bar.expanded .symbol-text {
  opacity: 1;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 14px;
}

.button {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
}

.button:hover {
  background: rgba(59, 130, 246, 0.15);
  color: #ffffff;
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateX(4px);
}

.button.active {
  background: rgba(59, 130, 246, 0.2);
  color: #ffffff;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.3);
}

.button i {
  font-size: 20px;
  min-width: 24px;
  text-align: center;
  color: #94a3b8;
  transition: color 0.25s ease;
}

.button:hover i {
  color: #ffffff;
}

.button.active i {
  color: #60a5fa;
}

.button-text {
  font-size: 0.95rem;
  white-space: nowrap;
  opacity: 0;
  font-weight: 500;
}

.lateral-bar.expanded .button-text {
  opacity: 1;
}

.bottom-section {
  padding: 18px 14px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.button.settings {
  background: rgba(255, 255, 255, 0.03);
}

.button.settings:hover {
  background: rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.3);
}

.button.settings.active {
  background: rgba(139, 92, 246, 0.2);
  border-color: #8b5cf6;
}

.expand-collapse {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  border-radius: 12px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.25s ease;
  background: rgba(255, 255, 255, 0.03);
}

.expand-collapse:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.expand-collapse i {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.lateral-bar.expanded .expand-collapse i {
  transform: rotate(180deg);
}

.expand-collapse .button-text {
  color: #94a3b8;
}

.expand-collapse:hover .button-text {
  color: #ffffff;
}
</style>