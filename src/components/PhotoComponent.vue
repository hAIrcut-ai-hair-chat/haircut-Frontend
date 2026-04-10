<script setup>
import { ref, computed } from "vue"
import { usePromptStore } from "../stores/prompt"
import { useChatStore } from "../stores/chat"
import AiOutputComponent from "./AiOutputComponent.vue"

const selectedFile = ref(null)
const previewUrl = ref(null)
const promptStore = usePromptStore()
const chatStore = useChatStore()

const messages = computed(() => chatStore.messages)
const isLoading = computed(() => promptStore.loading)

function handleFile(event) {
  const file = event.target.files[0]
  if (!file) return

  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

function removeImage() {
  selectedFile.value = null
  previewUrl.value = null
}

async function sendPhotos() {
  if (!promptStore.prompt.trim()) {
    alert("Por favor, descreva o corte de cabelo desejado")
    return
  }

  chatStore.addMessage('user', promptStore.prompt)
  await promptStore.sendPrompt()
  if (promptStore.response) {
    chatStore.addMessage('ai', promptStore.response)
  }
  promptStore.prompt = ''
}
</script>

<template>
  <div class="upload-section">
    <div class="chat-messages">
      <div v-if="messages.length === 0" class="chat-empty">

      </div>
      <div v-for="msg in messages" :key="msg.id" class="message" :class="msg.type">
        <AiOutputComponent :message="msg.content" :type="msg.type" />
      </div>
    </div>
    <div class="input-container">
      <div class="input-wrapper">

        <div v-if="previewUrl" class="image-inside">
          <img :src="previewUrl" alt="preview" />
          <button class="remove-btn" @click="removeImage">✕</button>
        </div>

        <input
          type="text"
          class="photo-input"
          :class="{ 'has-image': previewUrl, 'loading': promptStore.loading }"
          placeholder="Descreva o corte de cabelo desejado..."
          v-model="promptStore.prompt"
          @keyup.enter="sendPhotos"
          :disabled="promptStore.loading"
        />

        <div class="input-actions">
          <label class="action-btn upload-btn" title="Upload de imagem">
            <i class="mdi mdi-image-plus"></i>
            <span class="btn-label">Upload</span>

            <input
              type="file"
              class="hidden-file"
              accept="image/*"
              @change="handleFile"
            />
          </label>

          <button
            class="action-btn send-btn"
            title="Enviar para análise"
            @click="sendPhotos"
            :disabled="promptStore.loading"
          >
            <i :class="promptStore.loading ? 'mdi mdi-loading mdi-spin' : 'mdi mdi-send'"></i>
            <span class="btn-label">{{ promptStore.loading ? "Enviando..." : "Enviar" }}</span>
          </button>
        </div>

      </div>

      <div v-if="promptStore.error" class="error-message">
        <i class="mdi mdi-alert-circle"></i>
        {{ promptStore.error }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  padding: 2rem 1.25rem 1rem;
  gap: 1.5rem;
  background: transparent;
}

.input-container {
  width: 100%;
  max-width: 920px;
  margin-top: 0;
  position: relative;
  background: transparent;
}

.input-wrapper {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 920px;
}

.photo-input {
  width: 80%;
  min-height: 60px;
  padding: 1.1rem 170px 1.1rem 18px;
  font-size: 1.05rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(148, 163, 184, 0.18);
  color: #0f172a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.25s ease, padding-left 0.25s ease;
  position: relative;
  margin-left: 185px;
}

.photo-input:focus {
  outline: none;
  border-color: #3182ce;
  background: white;
}

.photo-input.has-image {
  padding-left: 70px;;
}

/* BOTÕES */
.input-actions {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 6px;
}

.action-btn {
  height: 40px;
  padding: 0 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.upload-btn {
  background: #edf2f7;
  color: #4a5568;
}

.upload-btn:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}

.send-btn {
  background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
  color: white;
}

.send-btn:hover {
  transform: translateY(-2px);
}

.hidden-file {
  display: none;
}

.image-inside {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  z-index: 3;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  margin-left: 185px;
}

.image-inside img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 18px;
  height: 18px;
  font-size: 11px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.7);
  color: white;
  cursor: pointer;
}

/* MENSAGENS */
.error-message {
  margin-top: 1rem;
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: #ef4444;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: slideIn 0.3s ease;
}

.response-message {
  margin-top: 1rem;
  padding: 12px 16px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 8px;
  color: #22c55e;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: slideIn 0.3s ease;
}

.photo-input.loading {
  opacity: 0.7;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes mdi-spin {
  to {
    transform: rotate(360deg);
  }
}

.mdi-spin {
  animation: mdi-spin 1s linear infinite;
}

.chat-messages {
  width: 100%;
  max-width: 920px;
  max-height: 68vh;
  overflow-y: auto;
  padding: 18px;
  background: transparent;
  border-radius: 24px;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


.message {
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.ai {
  justify-content: flex-start;
}

.message.user .output {
  background: rgba(59, 130, 246, 0.12);
  color: #0f172a;
}

.message.ai .output {
  background: rgba(255, 255, 255, 0.96);
  color: #0f172a;
}
</style>