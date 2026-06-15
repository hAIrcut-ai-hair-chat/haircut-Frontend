import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/plugins/axios";
import { useRouter } from "vue-router";

export const useForgetPasswordStore = defineStore("forget", () => {
    const router = useRouter();
    const loading = ref(false);
    const error = ref(null);
    const success = ref(null);

    const sendCode = async (email) => {
        loading.value = true;
        error.value = null;
        success.value = null;

        try {
            const response = await api.post("/password/code/", {
                email: email
            });

            success.value = response.data.message;

            router.push({ name: 'new_password' });

            return response.data;

        } catch (err) {
            error.value =
                err.response?.data?.message ||
                "Erro ao enviar email";

            throw err;

        } finally {
            loading.value = false;
        }
    };

    const resetPassword = async (email, code, newPassword) => {
        loading.value = true;
        error.value = null;
        success.value = null;

        console.log(email, code, newPassword);

        try {
            const response = await api.post("/password/update/", {
                email: email,
                code: code,
                new_password: newPassword
            });

            success.value = response.data.message;

            router.push({ name: 'login' })

            return response.data;

        } catch (err) {
            error.value =
                err.response?.data?.message ||
                "Erro ao alterar senha";

            throw err;

        } finally {
            loading.value = false;
        }
    };

    const clearMessages = () => {
        error.value = null;
        success.value = null;
    };

    return {
        loading,
        error,
        success,
        sendCode,
        resetPassword,
        clearMessages
    };
});