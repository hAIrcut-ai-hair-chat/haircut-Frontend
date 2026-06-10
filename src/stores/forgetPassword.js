import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/plugins/axios";

export const useForgetPasswordStore = defineStore("forget", () => {
    const loading = ref(false);
    const error = ref(null);
    const success = ref(null);

    const sendCode = async (email) => {
        loading.value = true;
        error.value = null;
        success.value = null;

        try {
            const response = await api.post("/password/code/",
            {
                email: email
            });

            success.value = response.data.message;

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
        alert(email, code, newPassword)

        try {
            const response = await api.patch("/password/code/", {
                email: email,
                code: code,
                new_password: newPassword
            });

            success.value = response.data.message;

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