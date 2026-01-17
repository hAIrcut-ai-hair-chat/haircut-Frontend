<script setup>
import { onMounted, ref } from 'vue'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'
import { useAuthStore } from '@/stores/auth'
import LateralBar from '@/components/LateralBar.vue'

const authStore = useAuthStore()
const psg_auth_token = ref('')
const copyMessageVisible = ref(false)

const getUserInfo = async () => {
  try {
    const authToken = localStorage.getItem('psg_auth_token')
    const passageUser = new PassageUser(authToken)
    const user = await passageUser.userInfo(authToken)
    psg_auth_token.value = authToken
    if (user) {
      await authStore.setToken(authToken)
    } else {
      authStore.unsetToken()
    }
  } catch (error) {
    authStore.unsetToken()
  }
}

const copyToClipboard = () => {
  navigator.clipboard
    .writeText(psg_auth_token.value)
    .then(() => {
      copyMessageVisible.value = true
      setTimeout(() => {
        copyMessageVisible.value = false
      }, 2000)
    })
    .catch((err) => {
      console.error('Erro ao copiar o token: ', err)
    })
}

onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <div class="chat-interface">
    <aside class="sidebar">
      <LateralBar />
    </aside>

    <main class="main-content">
      <div class="welcome-section">
        <h1 class="welcome-title">
          Hello to <span class="brand-name">Haircut</span>!
        </h1>
      </div>
      
      <div class="profile-icon-container">
        <div class="profile-icon">
          <i class="mdi mdi-account-circle"></i>
        </div>
      </div>

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
              placeholder="Descreve como você deseja seu corte de cabelo"
              @keyup.enter="sendPhotos"
            />
            
            <div class="input-actions">
              <button class="action-btn upload-btn" title="Upload de imagem">
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
    </main>
  </div>
</template>

<style scoped>
.chat-interface {
  display: grid;
  grid-template-columns: 200px 1fr;
  min-height: 100vh;
  background-color: #ffffff;
}

.sidebar {
  background: #f8fafc;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.12);
}

.main-content {
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  position: relative;
}

.welcome-section {
  padding: 2rem 3rem 1.5rem;
  text-align: center;
  background: #f8fafc;
}

.profile-icon-container {
  position: absolute;
  top: 20px;
  right: 20px;
}

.profile-icon {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-icon i {
  font-size: 30px;
  color: #3182ce;
}
.profile-icon i {
  cursor: pointer;
}

.welcome-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: linear-gradient(135deg, #2d2a55 0%, #3a3570 100%);
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  border-radius: 999px;
  border: none;
  box-shadow: 0 4px 12px rgba(45, 42, 85, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.welcome-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s ease;
}

.welcome-title:hover {
  background: linear-gradient(135deg, #3a3570 0%, #4a4490 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(45, 42, 85, 0.4);
  font-weight: 600;
  letter-spacing: 0.3px;
}

.welcome-title:hover::before {
  left: 100%;
}

.welcome-title:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(45, 42, 85, 0.3);
}

.welcome-title i {
  font-size: 16px;
  transition: transform 0.3s ease;
}

.welcome-title:hover i {
  transform: scale(1.1);
} 

.brand-name {
  font-weight: 700;
  color: #3182ce;
  background: linear-gradient(135deg, #3182ce 0%, #63b3ed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

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
  .chat-interface {
    grid-template-columns: 240px 1fr;
  }
  
  .input-container {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .chat-interface {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
  
  .sidebar {
    display: none;
  }
  
  .welcome-section {
    padding: 1.5rem 1rem;
  }
  
  .profile-icon {
    width: 20px;
    height: 20px;
  }
  
  .profile-icon i {
    font-size: 20px;
  }
  
  .welcome-title {
    font-size: 2rem;
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
  
  .welcome-title {
    font-size: 1.75rem;
  }
  
  .photo-input {
    height: 52px;
    font-size: 0.95rem;
  }
  
  .profile-icon {
    width: 60px;
    height: 60px;
  }
  
  .profile-icon i {
    font-size: 36px;
  }
}
</style>