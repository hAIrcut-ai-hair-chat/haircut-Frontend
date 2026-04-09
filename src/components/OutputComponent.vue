<script setup>
import { computed } from 'vue'
import { usePromptStore } from '@/stores/prompt'

const promptStore = usePromptStore()

const displayMessage = computed(() => {
  if (promptStore.loading) return 'Processando sua solicitação...'
  if (promptStore.error) return promptStore.error
  if (promptStore.response) return promptStore.response
  return 'Envie uma descrição para começar'
})

const hasContent = computed(() => {
  return promptStore.loading || promptStore.error || promptStore.response
})
</script>

<template>
  <div class="container">
    <div class="output" :class="{ 
      error: promptStore.error, 
      loading: promptStore.loading,
      'has-content': hasContent
    }">
      <Transition name="fade-slide">
        <div v-if="hasContent" class="output-content">
          {{ displayMessage }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeSlideDown {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
}

.fade-slide-enter-active {
  animation: fadeSlideUp 0.4s ease-out;
}

.fade-slide-leave-active {
  animation: fadeSlideDown 0.3s ease-in;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
  border-radius: 12px;
}

.output {
  flex: 1;
  min-height: 120px;
  background-color: #f8fafc;
  padding: 20px;
  overflow-y: auto;
  color: #111827;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.output.loading {
  background-color: #f0f9ff;
  border-color: #bae6fd;
}

.output.error {
  background-color: #fef2f2;
  color: #991b1b;
  border-color: #fed7d7;
}

.output.has-content {
  min-height: 140px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
}

.output-content {
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.6;
  font-size: 0.95rem;
}
</style>