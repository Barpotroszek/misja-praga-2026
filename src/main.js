import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

createApp(App).use(router).mount('#app')

// Rejestracja Service Workera (PWA) — vite-plugin-pwa wstrzykuje ją
// automatycznie w zbudowanej wersji (patrz vite.config.js -> injectRegister).
