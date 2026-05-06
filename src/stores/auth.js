import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/plugins/axios'; 
import router from '@/router'; 

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null);
  const loggedIn = ref(false);

  const isAuthenticated = computed(() => loggedIn.value && !!token.value);

  function unsetToken() {
    token.value = null;
    loggedIn.value = false;
    localStorage.removeItem('auth_token');
    delete api.defaults.headers.common['Authorization'];
  }

async function login(email, password) {
  console.log('[login] Iniciando login para email:', email?.value || email);

  try {
    console.log('[login] Enviando requisição para /token/');
    const response = await api.post('/token/', {
      email: email,
      password: password
    });

    console.log('[login] Resposta recebida, status:', response.status);
    const data = response.data;
    console.log('[login] Dados da resposta:', { access: !!data.access, refresh: !!data.refresh });

    if (!data.access) {
      console.error('[login] Token não retornado no response.data');
      throw new Error('Token não retornado');
    }

    console.log('[login] Token obtido com sucesso');
    token.value = data.access;
    loggedIn.value = true;

    localStorage.setItem('auth_token', data.access);
    console.log('[login] Token salvo no localStorage');

    api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
    console.log('[login] Header Authorization configurado no axios');

    router.push('/');
    console.log('[login] Redirecionando para "/"');

    return data;

  } catch (error) {
    console.error('[login] Erro capturado:', error.message);
    if (error.response) {
      console.error('[login] Detalhes do erro:', {
        status: error.response.status,
        data: error.response.data
      });
    }
    unsetToken();
    console.log('[login] Token limpo (unsetToken executado)');
    throw error;
  }
}


  function initializeAuth() {
    const storedToken = localStorage.getItem('access');
    if (storedToken) {
      token.value = storedToken;
      loggedIn.value = true;
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }

  initializeAuth();

  return {
    token,
    loggedIn,
    isAuthenticated,
    login,
    unsetToken,
    initializeAuth
  };
});