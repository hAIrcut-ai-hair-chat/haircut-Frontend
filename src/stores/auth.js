import { ref } from 'vue';
import { defineStore } from 'pinia';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loggedIn = ref(false);
  const token = ref(localStorage.getItem('psg_auth_token') || null);

  async function setToken(newToken) {
    if (!newToken) {
      unsetToken();
      return;
    }

    const passageUser = new PassageUser(newToken);
    const userData = await passageUser.userInfo(newToken);

    if (!userData) {
      unsetToken();
      return;
    }

    user.value = userData;
    token.value = newToken;
    loggedIn.value = true;
    localStorage.setItem('psg_auth_token', newToken);

    return userData;
  }

  function unsetToken() {
    user.value = null;
    loggedIn.value = false;
    token.value = null;
    localStorage.removeItem('psg_auth_token');
  }

  return { user, loggedIn, token, setToken, unsetToken };
});
