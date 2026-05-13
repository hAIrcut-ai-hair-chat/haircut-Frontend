import { defineStore } from "pinia"
import { ref } from "vue"

export const useRoomSocketStore = defineStore("roomSocket", () => {
  const socket = ref(null)
  const messages = ref([])
  const isConnected = ref(false)

    console.log(import.meta.env.VITE_WEBSOCKET_URL)
  function connect() {
    socket.value = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET_URL}/room/123/`
    )

    socket.value.onopen = () => {
      isConnected.value = true
      console.log("Connected WebSocket")
    }

    socket.value.onmessage = (event) => {
      const data = JSON.parse(event.data)

      messages.value.push(data)

      console.log("[WS]", data)
    }

    socket.value.onclose = () => {
      isConnected.value = false
      console.log("Disconnected WebSocket")
    }

    socket.value.onerror = (err) => {
      console.error("WebSocket Error", err)
    }
  }

  function sendMessage(message) {
    if (!socket.value || socket.value.readyState !== WebSocket.OPEN) {
      return
    }

    socket.value.send(
      JSON.stringify({ message })
    )
  }

  function disconnect() {
    if (socket.value) {
      socket.value.close()
      socket.value = null
    }
  }

  return {
    socket,
    messages,
    isConnected,
    connect,
    sendMessage,
    disconnect
  }
})