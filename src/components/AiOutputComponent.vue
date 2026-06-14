<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: "Hello, World!"
  },
  type: {
    type: String,
    default: 'ai'
  },
  timestamp: {
    type: Number,
    default: null
  }
})

const displayMessage = props.message

const formattedTime = computed(() => {
  if (!props.timestamp) return ''
  return new Date(props.timestamp).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>


<template>
  <div class="container" :class="props.type">
    <div class="output" :class="props.type">
      <Transition name="fade-slide">
        <div class="output-content">
          {{ displayMessage }}
        </div>
      </Transition>
      <div class="timestamp" v-if="formattedTime">{{ formattedTime }}</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
}
.container.ai {
  justify-content: flex-start;
}
.container.user {
  justify-content: flex-end;
}
.output {
  width: fit-content;
  max-width: 85%;
  min-width: 160px;
  border-radius: 24px;
  padding: 1.1rem 1.35rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
}
.output.ai {
  background: rgba(255, 255, 255, 0.95);
  color: #0f172a;
  border: 1px solid rgba(148, 163, 184, 0.12);
}
.output.user {
  background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
  color: #ffffff;
}
.output {
  width: fit-content;
  max-width: 700px; 
  min-width: 160px;
  border-radius: 24px;
  padding: 1.1rem 1.35rem 2rem 1.35rem;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
}

.output-content {
  white-space: pre-wrap;
  line-height: 1.7;
  font-size: 1rem;
  overflow-wrap: break-word;
  word-break: break-word;
}

.timestamp {
  position: absolute;
  right: 15px;
  bottom: 8px;
  top: 48px;
  font-size: 0.75rem;
  opacity: 0.7;
}


</style>