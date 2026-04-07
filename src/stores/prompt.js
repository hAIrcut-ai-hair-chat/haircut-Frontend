import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

const api_url = 'http://127.0.0.1:19003/api/ia'

export const usePromptStore = defineStore('prompt', () => {
  const prompt = ref('')
  const response = ref('')
  const loading = ref(false)
  const error = ref(null)

  const sendPrompt = async () => {
    console.log('[sendPrompt] Enviando prompt:', prompt.value)
    loading.value = true
    error.value = null

    try {
      const res = await axios.post(api_url, { prompt: prompt.value })
      console.log('[sendPrompt] Resposta recebida:', res.data)
      response.value = res.data.response || 'Resposta inesperada do servidor.'
    } catch (err) {
      console.error('[sendPrompt] Erro ao enviar prompt:', err)
      error.value = 'Erro ao enviar prompt. Tente novamente.'
    } finally {
      loading.value = false
    }
  }

  return { prompt, response, loading, error, sendPrompt }
})