// useRoomSocketStore.js
import { defineStore } from "pinia"
import { ref } from "vue"
import { useAuthStore } from "./auth"

export const useRoomSocketStore = defineStore("roomSocket", () => {
  const socket = ref(null)
  const messages = ref([])
  const isConnected = ref(false)

  function connect(roomId) {
    const authStore = useAuthStore()
    const token = authStore.token?.value  // ← obtém o valor atualizado
    
    if (!token) {
      console.error("Token não encontrado. Faça login primeiro.")
      return false
    }

    if (!roomId) {
      console.error("roomId é obrigatório")
      return false
    }

    // 🔒 Ideal: usar subprotocolo ou header, mas WebSocket browser não suporta headers customizados facilmente.
    // Alternativa mais segura: enviar token como primeiro frame após conexão.
    const wsUrl = `${import.meta.env.VITE_WEBSOCKET_URL}/room/${roomId}/?token=${encodeURIComponent(token)}`
    socket.value = new WebSocket(wsUrl)

    socket.value.onopen = () => {
      isConnected.value = true
      console.log("WebSocket conectado")
    }

    socket.value.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        messages.value.push({ ...data, id: Date.now() })  // ← id para v-for
        console.log("[WS]", data)
      } catch (e) {
        console.error("Erro ao parsear mensagem", e)
      }
    }

    socket.value.onclose = () => {
      isConnected.value = false
      console.log("WebSocket desconectado")
    }

    socket.value.onerror = (err) => {
      console.error("WebSocket error", err)
    }
    
    return true
  }

  function sendMessage(content) {
    if (!socket.value || socket.value.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket não está aberto")
      return false
    }
    socket.value.send(JSON.stringify({ message: content }))
    return true
  }

  function disconnect() {
    if (socket.value) {
      socket.value.close()
      socket.value = null
    }
  }

  return { messages, isConnected, connect, sendMessage, disconnect }
})