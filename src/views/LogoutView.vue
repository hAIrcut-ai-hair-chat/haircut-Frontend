<script setup>
import { onMounted} from 'vue'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  authStore.unsetToken()
  localStorage.removeItem('psg_auth_token')
  router.push({ name: 'home' })
})
</script>

<template>
  <div class="logout-container">
    <h1>Logging out..</h1>
  </div>
</template>

<style scoped>
.logout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ffffff;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin: 0;
  text-align: center;
}
</style>
