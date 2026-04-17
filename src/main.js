import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import '@mdi/font/css/materialdesignicons.min.css'
import { registerSW } from 'virtual:pwa-register'


import App from './App.vue';
import router from './router';
import './plugins/axios';

import './assets/main.css';

registerSW({ immediate: true })

const app = createApp(App);

const pinia = createPinia();
pinia.use(createPersistedState());

app.use(pinia);
app.use(router);




app.mount('#app');
