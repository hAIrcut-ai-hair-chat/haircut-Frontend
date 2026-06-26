<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { getUsers } from '@/stores/getUsers'
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()

const showPassword = ref(false)

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
            <span class="mdi mdi-lock"></span>

            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password"
              class="input-field" />

            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              <span :class="showPassword ? 'mdi mdi-eye-off-outline' : 'mdi mdi-eye-outline'"></span>
            </button>
          </div>
          <div class="form-options">
            <label class="custom-checkbox">
              <input type="checkbox" v-model="rememberMe" />
              <span>Keep me signed in</span>
            </label>
            <a href="#" @click.prevent="router.push({ name: 'forget_password' })">Forgot password?
            </a>
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
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
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
  background: radial-gradient(circle at top, rgba(255, 255, 255, 0.08), transparent 60%);
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
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
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
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

.input-group {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 0 0 0 16px;
  margin-bottom: 18px;
  height: 54px;
  transition: 0.3s;
}

.input-group span:first-child {
  margin-right: 12px;
  opacity: 0.6;
  font-size: 20px;
}

.input-field {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: white;
  font-size: 0.95rem;
  line-height: normal;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.toggle-password {
  background: transparent;
  border: none;
  padding: 0;
  padding-right: 10px;
  margin-right: 0;
  height: 100%;
  width: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  flex-shrink: 0;
}

.toggle-password:hover {
  color: #4aa3ff;
}

.toggle-password:focus {
  outline: none;
}

.toggle-password span {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 1;
}

.input-group:focus-within {
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
}

@media (max-width: 800px) {
  .auth-card {
    flex-direction: column;
  }
}

.password-group {
  position: relative;
}

.password-group input {
  width: 100%;
  padding-right: 48px;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);

  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: rgba(255, 255, 255, .65);
}

.password-toggle:hover {
  color: #4aa3ff;
}

.password-toggle span {
  font-size: 22px;
  line-height: 1;
}

.mdi-eye,
.mdi-eye-off {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
}
</style>