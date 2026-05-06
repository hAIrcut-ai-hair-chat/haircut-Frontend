const sendPromptWS = async () => {
  console.log('[WS] Enviando prompt:', prompt.value)

  const validatedPrompt = await getPromptMessage(prompt.value)
  if (!validatedPrompt) return

  loading.value = true
  error.value = null

  const authStore = useAuthStore()

  uuid.value = crypto.randomUUID()
  author.value = authStore.user?.id || authStore.user?.uuid || 1
  created_at.value = new Date().toISOString()
  image_url.value = ''
  feedback.value = null
  
  socket = new WebSocket(
    `${import.meta.env.VITE_WEBSOCKET_URL}/ws/room/perereca/`
  )

  socket.onopen = () => {
    console.log('[WS] conectado')

    socket.send(
      JSON.stringify({
        uuid: uuid.value,
        author: author.value,
        prompt: validatedPrompt,
        created_at: created_at.value
      })
    )
  }

  socket.onmessage = (event) => {
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
      socket.close()
    }
  }

  socket.onerror = (err) => {
    console.error('[WS] erro:', err)
    error.value = 'Erro no WebSocket'
    loading.value = false
  }

  socket.onclose = () => {
    console.log('[WS] fechado')
    loading.value = false
  }
}

export function usePromptStore() {
  
}