<script setup>
import { onMounted, ref } from 'vue'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'
import { useAuthStore } from '@/stores/auth'
import GlassCarouselBackground from '@/components/GlassCarouselBackground.vue'
import SidebarLayout from '@/components/SidebarLayout.vue'
import MainContentLayout from '@/components/MainContentLayout.vue'



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
  <GlassCarouselBackground />

  <div class="chat-interface">
    <SidebarLayout />
    <MainContentLayout />
  </div>
</template>

<style scoped>
.home-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.glass-carousel,
.home-background .glass-carousel {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.14), transparent 35%),
              radial-gradient(circle at 80% 40%, rgba(107, 180, 255, 0.12), transparent 30%),
              linear-gradient(140deg, rgba(10, 12, 30, 0.82), rgba(22, 28, 54, 0.68));
}

.home-background .carousel-track {
  position: absolute;
  width: 200%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  animation: slide 30s linear infinite;
  transform-origin: center;
}

.home-background .item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 28px;
  color: white;
  text-shadow: 0 4px 14px rgba(0,0,0,0.4);
  font-size: 3rem;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.25), 0 25px 50px rgba(0,0,0,0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  transform: scale(0.42);
  transition: transform 0.4s ease, filter 0.4s ease;
}

.home-background .item:hover {
  transform: scale(0.98);
  filter: saturate(1.3);
}

.home-background .glass-film {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: inset 0 0 120px rgba(255, 255, 255, 0.15);
}

@keyframes slide {
  0% { transform: translateX(0) rotate(0); }
  50% { transform: translateX(-50%) rotate(5deg); }
  100% { transform: translateX(-100%) rotate(0); }
}

.chat-interface {
  display: grid;
  grid-template-columns: 200px 1fr;
  min-height: 100vh;
  background-color: transparent;
  position: relative;
  z-index: 2;
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
  
  background-clip: text;          
  -webkit-background-clip: text;  

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
.output-container {
  bottom: 0;
  left: 200px;
  right: 0;
  top: 300px; 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}
</style>