<script setup>
import { ref } from "vue"

const selectedFile = ref(null)
const textPrompt = ref("")


function handleFile(event) {
  const file = event.target.files[0]
  if (!file) return

  selectedFile.value = file
  console.log("Arquivo selecionado:", file)
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

        <input
          type="text"
          class="photo-input"
          placeholder="Descreva como você deseja seu corte de cabelo"
          v-model="textPrompt"
          @keyup.enter="sendPhotos"
        />

        <div class="input-actions">

          <!-- BOTÃO UPLOAD -->
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

*          <button
            class="action-btn send-btn primary"
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
  flex-direction: column;
  align-items: center;
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
}

.photo-input {
  width: 705px;
  height: 70px;
  padding: 0 180px 0 1.5rem;
  font-size: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #2d3748;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;
}

.photo-input:focus {
  outline: none;
  border-color: #3182ce;
  background: white;
}

.input-actions {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 10px;
}

.action-btn {
  height: 46px;
  padding: 0 1.25rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.95rem;
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

.btn-label {
  display: inline-block;
}

.hidden-file {
  display: none;
}
</style>