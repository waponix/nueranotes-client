import './assets/tailwind.css';
import 'vue3-perfect-scrollbar/style.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPersistedstate);

app.use(pinia)
app.use(router)
app.use(PerfectScrollbarPlugin)

app.mount('#app')
