import { defineStore } from "pinia"
import { ref, computed } from "vue"
import api from "../plugins/axios"
import router from "../router"

export const useRegisterStore = defineStore("register", () => {

    const email = ref('')
    const password = ref('')
    const response = ref(null)
    const error = ref(null)
    const loading = ref(false)

    const hasError = computed(() => !!error.value)

    const url = import.meta.env.VITE_BACKEND_TESTE_URL

    if (!url) {
        console.error("Cannot import VITE_BACKEND_TESTE_URL in register store")
    }

    async function createAccount(userEmail, userPassword) {

        loading.value = true
        error.value = null

        try {

            const res = await api.post(`${url}/users/`, {
                email: userEmail,
                password: userPassword
            })

            response.value = res.data

            email.value = userEmail
            password.value = userPassword

            router.push('/login')

        }
        catch (err) {

            console.error(err)

            error.value =
                err.response?.data?.message ||
                err.response?.data ||
                "Error in create account"

        }
        finally {
            loading.value = false
        }
    }

    return {
        email,
        password,
        response,
        error,
        loading,
        hasError,
        createAccount
    }
})