<script setup>
import { ref } from "vue"

const selectedFile = ref(null)
const textPrompt = ref("")
const previewUrl = ref(null)

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

function sendPhotos() {
  console.log("Texto:", textPrompt.value)
  console.log("Arquivo:", selectedFile.value)
}
</script>

<template>
  <div class="upload-section">
    <div class="input-container">
      <div class="input-wrapper">

        <!-- IMAGEM DENTRO DO INPUT (só aparece quando existe preview) -->
        <div v-if="previewUrl" class="image-inside">
          <img :src="previewUrl" alt="preview" />
          <button class="remove-btn" @click="removeImage">✕</button>
        </div>

        <input
          type="text"
          class="photo-input"
          :class="{ 'has-image': previewUrl }"
          placeholder="Descreva como você deseja seu corte de cabelo"
          v-model="textPrompt"
          @keyup.enter="sendPhotos"
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
          >
            <i class="mdi mdi-send"></i>
            <span class="btn-label">Enviar</span>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-section {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.input-container {
  width: 100%;
  max-width: 700px;
  margin-top: 200px;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

/* INPUT – com padding-left dinâmico */
.photo-input {
  width: 100%;
  height: 65px;
  padding: 0 140px 0 15px;   /* sem imagem: padding esquerdo pequeno */
  font-size: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #2d3748;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transition: all 0.25s ease, padding-left 0.25s ease; /* suaviza a mudança */
}

.photo-input:focus {
  outline: none;
  border-color: #3182ce;
  background: white;
}

/* Quando há imagem, aumenta o padding para dar espaço */
.photo-input.has-image {
  padding-left: 70px;
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

/* IMAGEM DENTRO DO INPUT */
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
</style>