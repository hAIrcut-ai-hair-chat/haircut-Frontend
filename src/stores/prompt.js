import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth.js'

const api_url = "http://127.0.0.1:19003/api/ai/"

export const usePromptStore = defineStore('prompt', () => {
  const prompt = ref('')
  const response = ref('')
  const loading = ref(false)
  const error = ref(null)
  const uuid = ref('')
  const author = ref('')
  const image_url = ref('')
  const created_at = ref('')
  const feedback = ref('')

  const sendPrompt = async () => {
    console.log('[sendPrompt] Enviando prompt:', prompt.value)

    loading.value = true
    error.value = null

    const authStore = useAuthStore()

    uuid.value = null
    author.value = 1
    created_at.value = new Date().toISOString()

    const dataToSend = {
      author: author.value,
      prompt: prompt.value,
      feedback: feedback.value
    }

    try {
      const res = await axios.post(api_url, dataToSend)

      console.log('[sendPrompt] Resposta recebida:', res.data)

      response.value = res.data.prompt
      image_url.value = res.data.image_url
      uuid.value = res.data.uuid
      created_at.value = res.data.created_at

    } catch (err) {
      console.error('[sendPrompt] Erro:', err)
      error.value = 'Erro ao enviar prompt. Tente novamente.'
    } finally {
      loading.value = false
    }
  }

  return {
    prompt,
    response,
    loading,
    error,
    uuid,
    author,
    image_url,
    created_at,
    feedback,
    sendPrompt
  }
})