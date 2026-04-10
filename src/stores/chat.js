import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])

  const addMessage = (type, content) => {
    messages.value.push({ type, content, id: Date.now() })
  }

  const clearMessages = () => {
    messages.value = []
  }

  return {
    messages,
    addMessage,
    clearMessages
  }
})