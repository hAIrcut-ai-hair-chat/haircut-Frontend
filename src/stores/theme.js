import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') === 'dark' || false);

  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  const setTheme = (theme) => {
    isDark.value = theme === 'dark';
  };

  // Aplicar tema ao documento
  watch(
    isDark,
    (newValue) => {
      const htmlElement = document.documentElement;
      if (newValue) {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    },
    { immediate: true }
  );

  return {
    isDark,
    toggleTheme,
    setTheme,
  };
}, {
  persist: true,
});
