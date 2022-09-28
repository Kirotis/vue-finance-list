import { createApp } from 'vue'
import App from './App.vue'
import router from '@/pages'
import './assets/tailwind.css'
import naive from 'naive-ui'

export const app = createApp(App).use(naive).use(router)
