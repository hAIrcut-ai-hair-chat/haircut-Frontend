<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRegisterStore } from '@/stores/register'

const registerStore = useRegisterStore()
const { loading, error } = storeToRefs(registerStore)

const email = ref('')
const password = ref('')

const handleRegister = async () => {
  await registerStore.createAccount(email.value, password.value)
}

const dismissError = () => {
  if (registerStore.clearError) {
    registerStore.clearError()
  } else {
    error.value = null
  }
}
</script>

<template>
  <!-- Alert flutuante estilo toast -->
  <Transition name="alert-fade">
    <div v-if="error" class="global-alert">
      <div class="alert-content">
        <span class="alert-icon mdi mdi-alert-circle"></span>
        <span class="alert-message">{{ error }}</span>
        <button class="alert-close" @click="dismissError">✕</button>
      </div>
    </div>
  </Transition>

  <div class="auth-wrapper">
    <div class="auth-card">
      <div class="brand-panel">
        <div class="overlay"></div>
        <div class="brand-content">
          <h1>Haircut Studio</h1>
          <p>Your AI haircut assistant. More style, more confidence, more you.</p>
        </div>
        <span class="mdi mdi-hair-dryer deco-icon pos-1"></span>
        <span class="mdi mdi-scissors-cutting deco-icon pos-2"></span>
        <div class="glow-circle g1"></div>
        <div class="glow-circle g2"></div>
      </div>

      <div class="form-panel">
        <h2>New Here?</h2>
        <p class="subtitle">Create an account and discover the best haircut to you</p>

        <form @submit.prevent="handleRegister">
          <div class="input-group">
            <span class="mdi mdi-email-outline"></span>
            <input v-model="email" type="email" placeholder="Email" />
          </div>

          <div class="input-group">
            <span class="mdi mdi-lock"></span>
            <input v-model="password" type="password" placeholder="Password" />
          </div>

          <button type="submit" class="btn-primary" :disabled="loading">
            {{ loading ? 'Creating account...' : 'Register' }}
          </button>
        </form>

        <p class="signup">
          Have an account?
          <router-link to="/login">Login here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css");

/* ===== ALERT FLUTUANTE ESTILO TOAST ===== */
.global-alert {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  max-width: 90%;
  width: auto;
  min-width: 280px;
  background: #1e1a2f;
  backdrop-filter: blur(12px);
  border-left: 5px solid #ff4d4d;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 77, 77, 0.2);
  pointer-events: auto;
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  color: #ffeaea;
  font-weight: 500;
  background: rgba(30, 26, 47, 0.95);
  border-radius: 16px;
}

.alert-icon {
  font-size: 24px;
  color: #ff4d4d;
}

.alert-message {
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
}

.alert-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  transition: all 0.2s;
}

.alert-close:hover {
  background: rgba(255, 77, 77, 0.2);
  color: #ff4d4d;
}

/* Animação de entrada/saída */
.alert-fade-enter-active,
.alert-fade-leave-active {
  transition: all 0.3s ease;
}

.alert-fade-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-30px);
}

.alert-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

/* ===== ESTILOS ORIGINAIS ===== */
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top, #0b1220, #05070d);
  padding: 20px;
}

.auth-card {
  width: 950px;
  display: flex;
  flex-direction: row-reverse;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  backdrop-filter: blur(10px);
}

.brand-panel {
  flex: 1;
  position: relative;
  padding: 60px;
  color: white;
  background: linear-gradient(135deg, #0d47a1, #020b1f);
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 60%);
}

.brand-content {
  position: relative;
  z-index: 2;
}

.brand-panel h1 {
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: 1px;
}

.brand-panel p {
  margin-top: 15px;
  opacity: 0.85;
  line-height: 1.6;
}

.glow-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
}

.g1 {
  width: 250px;
  height: 250px;
  background: #1976d2;
  top: -80px;
  left: -60px;
}

.g2 {
  width: 300px;
  height: 300px;
  background: #00bcd4;
  bottom: -120px;
  right: -100px;
}

.deco-icon {
  position: absolute;
  font-size: 90px;
  opacity: 0.08;
}

.pos-1 {
  top: 30px;
  right: 30px;
}

.pos-2 {
  bottom: 30px;
  left: 20px;
}

.form-panel {
  flex: 1;
  background: #0e0f14;
  padding: 60px;
  color: white;
}

.form-panel h2 {
  font-size: 2rem;
  font-weight: 700;
}

.subtitle {
  opacity: 0.6;
  margin-bottom: 30px;
}

.input-group {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 12px 16px;
  margin-bottom: 18px;
  transition: 0.3s;
}

.input-group span {
  margin-right: 10px;
  opacity: 0.6;
}

.input-group input {
  background: transparent;
  border: none;
  outline: none;
  color: white;
  width: 100%;
}

.input-group:focus-within {
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25,118,210,0.2);
}

.btn-primary {
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(90deg, #1976d2, #00bcd4);
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.signup {
  margin-top: 25px;
  text-align: center;
  opacity: 0.7;
}

.signup a {
  color: #4aa3ff;
  font-weight: 600;
}

@media (max-width: 800px) {
  .auth-card {
    flex-direction: column;
  }
}
</style>