<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { getUsers } from '@/stores/getUsers'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const loadUsers = async () => {
  try {
    const users = await getUsers()

    console.log(users)

    if (users && users.length > 0) {
      console.log(users[0].email)
      console.log(users[0].password)
    } else {
      console.log('Nenhum usuário encontrado')
    }

  } catch (error) {
    console.error(
      'Erro ao carregar usuários:',
      error
    )
  }
}

onMounted(() => {
  loadUsers()
})

const handleLogin = async () => {
  try {
    console.log(
      'Haircut login started...'
    )

    await authStore.login(
      email.value,
      password.value,
      rememberMe.value
    )

  } catch (error) {
    console.error(error)

    alert(
      'Invalid email or password'
    )
  }
}
</script>


<template>
  <div class="auth-wrapper">
    <div class="auth-card">

      <div class="brand-panel">
        <div class="overlay"></div>

        <div class="brand-content">
          <h1>Haircut Studio</h1>
          <p>
            Your AI haircut assistant. More style, more confidence, more you.
          </p>
        </div>

         <span class="mdi mdi-hair-dryer deco-icon pos-1"></span>
        <span class="mdi mdi-scissors-cutting deco-icon pos-2"></span>

        <div class="glow-circle g1"></div>
        <div class="glow-circle g2"></div>
      </div>

       <div class="form-panel">
        <h2>Welcome back</h2>
        <p class="subtitle">Login to see the best haircuts for you</p>

        <form @submit.prevent="handleLogin">

          <div class="input-group">
            <span class="mdi mdi-email-outline"></span>
            <input v-model="email" type="email" placeholder="Email" />
          </div>

          <div class="input-group">
            <span class="mdi mdi-lock"></span>
            <input v-model="password" type="password" placeholder="Password" />
          </div>

          <div class="form-options">
            <label class="custom-checkbox">
              <input type="checkbox" v-model="rememberMe" />
              <span>Keep me signed in</span>
            </label>

            <a href="#">Forgot password?</a>
          </div>

          <button class="btn-primary" :disabled="loading">
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p class="signup">
          New here?
          <router-link to="/create-account">Create an account</router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css");

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

/* RIGHT PANEL */
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

/* options */
.form-options {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin: 10px 0 25px;
  opacity: 0.8;
}

.form-options a {
  color: #4aa3ff;
  text-decoration: none;
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