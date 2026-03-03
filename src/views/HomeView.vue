<script setup>
// O script permanece exatamente o mesmo, não mudei nada
import { onMounted, ref } from 'vue'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'
import { useAuthStore } from '@/stores/auth'
import LateralBar from '@/components/LateralBar.vue'
import PhotoComponent from '@/components/PhotoComponent.vue'

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
          Hello to<span class="brand-name">Haircut!</span>
        </h1>
      </div>

      <div class="profile-icon-container">
        <div class="profile-icon">
          <i class="mdi mdi-account-circle"></i>
        </div>
      </div>

      <div class="photo-container">
        <PhotoComponent />
      </div>
    </main>
  </div>
</template>

<style scoped>
.chat-interface {
  display: grid;
  grid-template-columns: 200px 1fr;
  min-height: 100vh;
  background-color: #cbd5e1;

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
  padding: 20px;
  overflow: hidden;
}

.welcome-section {
  padding: 2rem 3rem 1.5rem;
  text-align: center;
  z-index: 10;
  position: relative;
}

.profile-icon-container {
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 20;
}

.profile-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-icon i {
  font-size: 35px;
  color: #00417f;
  cursor: pointer;
}

.photo-container {
  position: fixed;
  bottom: 0;
  left: 200px;
  right: 0;
  top: 180px; 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

.welcome-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #2d2a55 0%, #3a3570 100%);
  color: #ffffff;
  font-size: 16px;
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
  background: linear-gradient(135deg, #3182ce 0%, #63b3ed 100%);
  
  background-clip: text;          /* padrão */
  -webkit-background-clip: text;  /* chrome/safari */

  color: transparent;          
  -webkit-text-fill-color: transparent;
}
@media (max-width: 1024px) {
  .chat-interface {
    grid-template-columns: 200px 1fr;
  }
  
  .photo-container {
    left: 200px;
  }
}

@media (max-width: 768px) {
  .chat-interface {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    display: none;
  }
  
  .photo-container {
    left: 0;
    top: 160px;
  }
  
  .welcome-section {
    padding: 1.5rem 1rem;
  }
  
  .profile-icon {
    width: 40px;
    height: 40px;
  }
  
  .profile-icon i {
    font-size: 24px;
  }
  
  .welcome-title {
    font-size: 14px;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .photo-container {
    top: 140px;
  }
  
  .welcome-title {
    font-size: 14px;
    padding: 10px 20px;
  }
  
  .profile-icon {
    width: 40px;
    height: 40px;
  }
  
  .profile-icon i {
    font-size: 24px;
  }
}
</style>