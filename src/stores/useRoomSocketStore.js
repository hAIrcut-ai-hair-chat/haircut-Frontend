import { defineStore } from "pinia";
import ref from 'vue'

export const useRoomSocketStore = defineStore("roomSocket", () => {
    const socket = ref(null)
    const messages = ref([])
    let isConnected = ref(false)

    function connect() {
        socket.value = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}/room`)

        socket.value.onopen = () => {
            isConnected.value = true
            console.log("Connected Websocket")
        }
        socket.value.onmessage = (event) => {
            const data = JSON.parse(event.data)
            messages.value.push(data.message)
        }
        socket.value.onclose = () => {
            isConnected.value = false
            console.log("Disconneted websocket")
        }
        socket.value.onerror = (err) => {
            console.error("Websocket Error", err)

        }
    
    }
    
    function sendMessage(message) {
        if (!socket.value) return
        
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