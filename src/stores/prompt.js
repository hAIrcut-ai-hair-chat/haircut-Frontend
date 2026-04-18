import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth.js'
import getPromptMessage from '@/composables/getPromptMessage.js'

const api_url = import.meta.env.BACKEND_URL + '/api/ai/'

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
  const selectedFile = ref(null)
  const previewUrl = ref(null)

  const sendPrompt = async () => {
    console.log('[sendPrompt] Enviando prompt:', prompt.value)
    
    const validatedPrompt = await getPromptMessage(prompt.value)
    if (!validatedPrompt) {
      return
    }

    loading.value = true
    error.value = null

    const authStore = useAuthStore()

    uuid.value = crypto.randomUUID()
    author.value = authStore.user?.id || authStore.user?.uuid || 1
    created_at.value = new Date().toISOString()
    image_url.value = ''
    feedback.value = null

    // Preparar dados para envio, incluindo imagem se selecionada
    const formData = new FormData()
    formData.append('uuid', uuid.value)
    formData.append('author', author.value)
    formData.append('prompt', prompt.value)
    formData.append('image_url', image_url.value)
    formData.append('created_at', created_at.value)
    formData.append('feedback', feedback.value)

    if (selectedFile.value) {
      formData.append('image', selectedFile.value)
    }

    try {
      const res = await axios.post(api_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log('[sendPrompt] Resposta recebida:', res.data)

      response.value = res.data.prompt || res.data.response || ''
      image_url.value = res.data.image_url || image_url.value
      uuid.value = res.data.uuid || uuid.value
      created_at.value = res.data.created_at || created_at.value

    } catch (err) {
      console.error('[sendPrompt] Erro:', err)
      if (err.response) {
        const status = err.response.status
        const responseData = err.response.data
        console.error('[sendPrompt] Erro de resposta:', status, responseData)

        const details = responseData?.detail || responseData?.message || responseData || 'Falha ao enviar prompt.'
        const message = typeof details === 'object' ? JSON.stringify(details, null, 2) : details

        error.value = `Erro ${status}: ${message}`
      } else {
        error.value = 'Erro ao enviar prompt. Tente novamente.'
      }
    } finally {
      loading.value = false
    }
  }

  const handleFile = (event) => {
    const file = event.target.files[0]
    if (!file) return

    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
    image_url.value = previewUrl.value
  }

  const removeImage = () => {
    selectedFile.value = null
    previewUrl.value = null
    image_url.value = ''
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
    selectedFile,
    previewUrl,
    sendPrompt,
    handleFile,
    removeImage
  }
})