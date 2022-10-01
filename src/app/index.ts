import { createApp } from 'vue'
import App from './App.vue'
import router from '@/pages'
import './assets/tailwind.css'
import naive from 'naive-ui'
import { createPinia } from 'pinia'

const pinia = createPinia()
export const app = createApp(App).use(pinia).use(naive).use(router)
