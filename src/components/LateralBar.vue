<script setup>
import { ref } from 'vue'

const isExpanded = ref(false)
const activeButton = ref('chat')

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const setActiveButton = (buttonName) => {
  activeButton.value = buttonName
}
</script>

<template>
  <div class="lateral-bar" :class="{ 'expanded': isExpanded }">
    <div class="top-section">
      <div class="haircut-symbol" @click="toggleExpanded">
        <i class="mdi mdi-hair-dryer"></i>
        <span v-if="isExpanded" class="symbol-text">HaircutAI</span>
      </div>
      
      <div class="buttons">
        <button 
          class="button" 
          :class="{ 'active': activeButton === 'new-chat' }"
          @click="setActiveButton('new-chat')"
          :title="isExpanded ? 'Novo chat' : ''"
        >
          <i class="mdi mdi-message-plus"></i>
          <span v-if="isExpanded" class="button-text">Novo chat</span>
        </button>
        
        <button 
          class="button" 
          :class="{ 'active': activeButton === 'images' }"
          @click="setActiveButton('images')"
          :title="isExpanded ? 'Suas imagens' : ''"
        >
          <i class="mdi mdi-image-outline"></i>
          <span v-if="isExpanded" class="button-text">Suas imagens</span>
        </button>
        
        <button 
          class="button" 
          :class="{ 'active': activeButton === 'chat' }"
          @click="setActiveButton('chat')"
          :title="isExpanded ? 'Chats recentes' : ''"
        >
          <i class="mdi mdi-chat"></i>
          <span v-if="isExpanded" class="button-text">Chats recentes</span>
        </button>
      </div>
    </div>

    <div class="bottom-section">
      <button 
        class="button settings" 
        :class="{ 'active': activeButton === 'settings' }"
        @click="setActiveButton('settings')"
        :title="isExpanded ? 'Configurações' : ''"
      >
        <i class="mdi mdi-cog"></i>
        <span v-if="isExpanded" class="button-text">Configurações</span>
      </button>
      
      <div class="expand-collapse" @click="toggleExpanded" :title="isExpanded ? 'Recolher menu' : 'Expandir menu'">
        <i :class="isExpanded ? 'mdi mdi-chevron-left' : 'mdi mdi-chevron-right'"></i>
        <span v-if="isExpanded" class="button-text">Recolher</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lateral-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 80px;
  background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 1000;
  overflow: hidden;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.haircut-symbol i {
  font-size: 20px;
  color: #ebf8ff;
  padding: 12px;
  border-radius: 12px;
  min-width: 24px;
  text-align: center;
}

.symbol-text {
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.2s ease;
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
  background: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #e5e7eb;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
}

.button:hover {
  background: rgba(49, 130, 206, 0.15);
  transform: translateX(4px);
}

.button.active {
  background: #ffffff;
  color: #1f2937;
  border-color: #e2e8f0;
}

.button i {
  font-size: 20px;
  min-width: 24px;
  text-align: center;
}

.button.active i {
  color: #3182ce;
}

.button-text {
  font-size: 0.95rem;
  white-space: nowrap;
  opacity: 0;
}

.lateral-bar.expanded .button-text {
  opacity: 1;
}

.bottom-section {
  padding: 18px 14px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.expand-collapse {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  border-radius: 12px;
  color: #e5e7eb;
  cursor: pointer;
  transition: all 0.25s ease;
}

.expand-collapse:hover {
  background: rgba(255, 255, 255, 0.08);
}

.expand-collapse i {
  font-size: 20px;
}

.lateral-bar.expanded .expand-collapse i {
  transform: rotate(180deg);
}


</style>