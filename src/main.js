import './assets/scss/main.scss';
import 'virtual:svg-icons-register';
import VueTheMask from 'vue-the-mask'
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router/index.js';

const app = createApp(App);
app.use(VueTheMask)

// Pinia глобальное хранилище
const pinia = createPinia();
app.use(pinia);
pinia.use(piniaPluginPersistedstate);

app.use(router);

app.mount('#app');
