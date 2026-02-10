import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // Import your router configuration
import './assets/styles.css'

const app = createApp(App)

app.use(createPinia())
app.use(router) // THIS LINE IS CRITICAL

app.mount('#app')