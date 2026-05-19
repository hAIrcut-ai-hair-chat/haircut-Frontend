import { defineStore } from "pinia"
import { ref, computed } from "vue"
import api from "../plugins/axios"
import router from "../router"

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const loggedIn = ref(false)

  const isAuthenticated = computed(
    () => loggedIn.value && !!token.value
  )

  function unsetToken() {
    token.value = null
    loggedIn.value = false

    localStorage.removeItem('token')
    sessionStorage.removeItem('token')

    delete api.defaults.headers.common['Authorization']
  }

  function initializeAuth() {
    const storedToken =
      localStorage.getItem('token') ||
      sessionStorage.getItem('token')

    if (storedToken) {
      token.value = storedToken
      loggedIn.value = true

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${storedToken}`
    }
  }

  async function login(
    email,
    password,
    keepMeSigned = false
  ) {
    try {
      const response = await api.post(
        '/token/',
        {
          email,
          password
        }
      )

      const { access } = response.data

      if (!access) {
        throw new Error(
          'Token não retornado'
        )
      }

      token.value = access
      loggedIn.value = true

      const storage = keepMeSigned
        ? localStorage
        : sessionStorage

      storage.setItem(
        'token',
        access
      )

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${access}`

      router.push('/')

      return response.data

    } catch (error) {
      unsetToken()
      throw error
    }
  }

  initializeAuth()

  return {
    token,
    loggedIn,
    isAuthenticated,
    login,
    unsetToken,
    initializeAuth
  }
})