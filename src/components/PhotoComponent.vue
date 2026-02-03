<script setup>
</script>

<template>
  <div class="upload-section">
    <div class="input-container">
      <div class="input-header">
        <i class="mdi mdi-image-area"></i>
        <h2>Envie suas fotos</h2>
      </div>

      <div class="input-wrapper">
        <input
          type="text"
          class="photo-input"
          placeholder="Descreva como você deseja seu corte de cabelo"
          @keyup.enter="sendPhotos"
        />

        <div class="input-actions">
          <button class="action-btn upload-btn" title="Upload de imagem">
            <i class="mdi mdi-image-plus"></i>
            <span class="btn-label">Upload</span>
          </button>

          <button class="action-btn send-btn primary" title="Enviar para análise">
            <i class="mdi mdi-send"></i>
            <span class="btn-label">Enviar</span>
          </button>
        </div>
      </div>

      <div class="input-hint">
        <i class="mdi mdi-information"></i>
        <p>Formatos suportados: JPG, PNG, WEBP. Tamanho máximo: 10MB</p>
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
  gap: 2rem;
}

.input-container {
  width: 100%;
  max-width: 700px;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.input-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.input-header i {
  font-size: 2rem;
  color: #3182ce;
  background: #ebf8ff;
  padding: 0.75rem;
  border-radius: 12px;
}

.input-header h2 {
  font-size: 1.5rem;
  color: #2d3748;
  font-weight: 600;
}

.input-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

.photo-input {
  width: 100%;
  height: 60px;
  padding: 0 180px 0 1.5rem;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: #f8fafc;
  color: #2d3748;
  transition: all 0.3s ease;
}

.photo-input:focus {
  outline: none;
  border-color: #3182ce;
  background: white;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}

.photo-input::placeholder {
  color: #a0aec0;
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
  justify-content: center;
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
  background: linear-gradient(135deg, #2c5282 0%, #3182ce 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
}

.btn-label {
  display: inline-block;
}

.input-hint {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: #f7fafc;
  border-radius: 8px;
  border-left: 4px solid #3182ce;
}

.input-hint i {
  color: #3182ce;
  font-size: 1.25rem;
}

.input-hint p {
  color: #718096;
  font-size: 0.9rem;
  margin: 0;
}

@media (max-width: 1024px) {
  
  .input-container {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .chat-interface {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
  .upload-section {
    padding: 1.5rem 1rem;
  }
  
  .input-actions {
    position: static;
    transform: none;
    margin-top: 1rem;
    justify-content: center;
  }
  
  .photo-input {
    padding: 0 1.5rem;
  }
  
  .action-btn {
    flex: 1;
    max-width: 160px;
  }
  
  .btn-label {
    display: none;
  }
}

@media (max-width: 480px) {
  .input-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  .photo-input {
    height: 52px;
    font-size: 0.95rem;
  }
}

</style>