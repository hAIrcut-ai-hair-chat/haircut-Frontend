import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const usePromptStore = defineStore('prompt', () => {
  const prompt = ref('')
  const response = ref('')
  const loading = ref(false)
  const error = ref(null)

  const previewUrl = ref('')
  const image_url = ref('')
  const selectedFile = ref(null)

  const uuid = ref(null)
  const author = ref(null)
  const created_at = ref(null)
  const feedback = ref(null)

  const socket = ref(null)

  function connectWebSocket(roomId = 'teste') {
    if (
      socket.value &&
      socket.value.readyState === WebSocket.OPEN
    ) {
      return
    }

    socket.value = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET_URL}/ws/room/${roomId}/`
    )

    socket.value.onopen = () => {
      console.log('[WS] conectado')
    }

    socket.value.onmessage = (event) => {
      const data = JSON.parse(event.data)

      console.log('[WS] resposta:', data)

      if (data.response) {
        response.value += data.response
      }

      if (data.image_url) {
        image_url.value = data.image_url
      }

      if (data.done) {
        loading.value = false
      }
    }

    socket.value.onerror = (err) => {
      console.error('[WS] erro:', err)

      error.value = 'Erro no WebSocket'
      loading.value = false
    }

    socket.value.onclose = () => {
      console.log('[WS] fechado')

      loading.value = false
    }
  }

  function disconnectWebSocket() {
    socket.value?.close()
  }

  async function sendPromptWS(roomId = 'teste') {
    if (!prompt.value.trim()) {
      error.value = 'Digite um prompt'
      return
    }

    connectWebSocket(roomId)

    loading.value = true
    error.value = null
    response.value = ''

    const authStore = useAuthStore()

    uuid.value = crypto.randomUUID()
    author.value =
      authStore.user?.id ||
      authStore.user?.uuid ||
      1

    created_at.value = new Date().toISOString()

    const payload = {
      uuid: uuid.value,
      author: author.value,
      prompt: prompt.value,
      created_at: created_at.value,
    }

    if (selectedFile.value) {
      payload.image_name = selectedFile.value.name
    }

    const waitSocket = setInterval(() => {
      if (socket.value?.readyState === WebSocket.OPEN) {
        socket.value.send(JSON.stringify(payload))

        clearInterval(waitSocket)
      }
    }, 100)
  }

  function handleFile(event) {
    const file = event.target.files[0]

    if (!file) return

    selectedFile.value = file

    previewUrl.value = URL.createObjectURL(file)
  }

  function removeImage() {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
    }

    previewUrl.value = ''
    selectedFile.value = null
    image_url.value = ''
  }

  return {
    prompt,
    response,
    loading,
    error,

    previewUrl,
    image_url,
    selectedFile,

    uuid,
    author,
    created_at,
    feedback,

    socket,

    connectWebSocket,
    disconnectWebSocket,
    sendPromptWS,

    handleFile,
    removeImage,
  }
})

