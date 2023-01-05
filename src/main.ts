import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { router } from '@/router'
import { createPinia } from 'pinia'
import './assets/styles/global.scss'
import naive from 'naive-ui'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(naive)
app.use(router)
app.mount('#app')
