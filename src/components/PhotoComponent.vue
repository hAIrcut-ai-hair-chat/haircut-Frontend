<script setup>
import {
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
  ref,
  watch
} from "vue"

import { usePromptStore } from "@/stores/prompt"
import { useRoomSocketStore } from "@/stores/useRoomSocketStore"
import AiOutputComponent from "./AiOutputComponent.vue"

const promptStore = usePromptStore()
const roomSocketStore = useRoomSocketStore()

const messages = computed(() => roomSocketStore.messages)

const textareaRef = ref(null)

const ROOM_ID = "123"

onMounted(() => {
  const connected = roomSocketStore.connect(ROOM_ID)

  if (!connected) {
    promptStore.error =
      "Não foi possível conectar. Verifique se está logado."
  }

  nextTick(adjustTextareaHeight)
})

onBeforeUnmount(() => {
  roomSocketStore.disconnect()
})

watch(
  () => promptStore.prompt,
  () => nextTick(adjustTextareaHeight)
)

function adjustTextareaHeight() {
  if (!textareaRef.value) return

  textareaRef.value.style.height = "auto"

  textareaRef.value.style.height =
    Math.min(textareaRef.value.scrollHeight, 200) + "px"
}

function sendPhotos() {
  if (!promptStore.prompt.trim()) {
    alert("Por favor, descreva o corte de cabelo desejado")
    return
  }

  roomSocketStore.messages.push({
    id: Date.now(),
    type: "user",
    content: promptStore.prompt
  })

  roomSocketStore.sendMessage(promptStore.prompt)

  promptStore.prompt = ""

  nextTick(adjustTextareaHeight)
}

function handleFile(e) {
  promptStore.handleFile(e)
}

function removeImage() {
  promptStore.removeImage()
}
</script>

<template>
  <div class="upload-section">
    <div class="chat-messages">
      <div
        v-if="messages.length === 0"
        class="chat-empty"
      ></div>

      <div
        v-for="msg in messages"
        :key="msg.id"
        class="message"
        :class="msg.type"
      >
        <AiOutputComponent
          :message="msg.content"
          :type="msg.type"
          :timestamp="msg.id"
        />
      </div>
    </div>

    <div class="input-container">
      <div class="input-wrapper">

        <div class="input-box">

          <div
            v-if="promptStore.previewUrl"
            class="image-preview"
          >
            <img
              :src="promptStore.previewUrl"
              alt="preview"
            >

            <button
              class="remove-btn"
              @click="removeImage"
            >
              ✕
            </button>
          </div>

          <textarea
            ref="textareaRef"
            v-model="promptStore.prompt"
            class="photo-input"
            :class="{
              'has-image': promptStore.previewUrl,
              'loading': promptStore.loading
            }"
            placeholder="Descreva o corte de cabelo desejado..."
            :disabled="promptStore.loading"
            @input="adjustTextareaHeight"
            @keydown.enter.exact.prevent="sendPhotos"
          />

          <div class="input-actions">
            <label
              class="action-btn upload-btn"
              title="Upload de imagem"
            >
              <i class="mdi mdi-image-plus"></i>

              <input
                type="file"
                class="hidden-file"
                accept="image/*"
                @change="handleFile"
              >
            </label>

            <button
              class="action-btn send-btn"
              title="Enviar para análise"
              :disabled="promptStore.loading"
              @click="sendPhotos"
            >
              <i
                :class="
                  promptStore.loading
                    ? 'mdi mdi-loading mdi-spin'
                    : 'mdi mdi-send'
                "
              ></i>
            </button>
          </div>

        </div>
      </div>

      <div
        v-if="promptStore.error"
        class="error-message"
      >
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
  padding: clamp(1rem, 5vw, 2rem)
           clamp(0.75rem, 3vw, 1.25rem)
           1rem;
  gap: 1.5rem;
  background: transparent;
}

.chat-messages {
  width: 100%;
  max-width: 920px;
  max-height: clamp(300px, 60vh, 68vh);
  overflow-y: auto;
  padding: clamp(12px, 3vw, 18px);
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

.input-container {
  width: 100%;
  position: relative;
}

.input-wrapper {
  position: fixed;
  left: 50%;
  bottom: clamp(80px, 15vh, 100px);
  transform: translateX(-50%);
  width: calc(100% - 2rem);
  max-width: 920px;
  z-index: 20;
}

.input-box {
  position: relative;
  width: 100%;
}

.photo-input {
  width: 100%;
  min-height: 64px;
  max-height: 200px;

  padding-top: 18px;
  padding-right: 105px;
  padding-bottom: 18px;
  padding-left: 18px;

  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 16px;

  background: rgba(255, 255, 255, 0.92);
  color: #0f172a;

  font-size: clamp(0.9rem, 2vw, 1.05rem);
  line-height: 1.5;

  resize: none;
  overflow-y: auto;
  overflow-wrap: anywhere;
  white-space: pre-wrap;

  box-sizing: border-box;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    height 0.1s ease;
}

.photo-input:focus {
  outline: none;
  border-color: #3182ce;
  background: white;
}

.photo-input.loading {
  opacity: 0.7;
}

.photo-input.has-image {
  padding-left: 72px;
}

.input-actions {
  position: absolute;
  right: 5px;
  bottom: 5px;

  display: flex;
  gap: 5px;
}

.action-btn {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 12px;

  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn i {
  font-size: 1.2rem;
}

.upload-btn {
  background: #edf2f7;
  color: #4a5568;
}

.upload-btn:hover {
  background: #e2e8f0;
}

.send-btn {
  background: linear-gradient(
    135deg,
    #3182ce 0%,
    #2c5282 100%
  );

  color: white;
}

.send-btn:hover {
  transform: translateY(-2px);
}

.send-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.hidden-file {
  display: none;
}

.image-preview {
  position: absolute;
  left: 16px;
  bottom: 12px;

  width: 44px;
  height: 44px;

  border-radius: 10px;
  overflow: hidden;

  z-index: 2;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: -5px;
  right: -5px;

  width: 18px;
  height: 18px;

  border: none;
  border-radius: 50%;

  background: rgba(0, 0, 0, 0.7);
  color: white;

  font-size: 11px;
  cursor: pointer;
}

.error-message {
  margin-top: 1rem;
  padding: 12px 16px;

  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);

  border-radius: 8px;
  color: #ef4444;

  display: flex;
  align-items: center;
  gap: 8px;
}

@keyframes mdi-spin {
  to {
    transform: rotate(360deg);
  }
}

.mdi-spin {
  animation: mdi-spin 1s linear infinite;
}
</style>
