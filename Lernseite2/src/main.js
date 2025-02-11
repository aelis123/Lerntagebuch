import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // Plugin importieren
import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // Plugin aktivieren

app.use(pinia)
app.use(router)

app.mount('#app')
