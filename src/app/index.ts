import { createApp } from 'vue'
import App from './App.vue'
import router from '@/pages'
import './assets/tailwind.css'
import naive from 'naive-ui'
import { createPinia } from 'pinia'
// import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const pinia = createPinia()
export const app = createApp(App)
	// .use(autoAnimatePlugin)
	.use(pinia)
	.use(naive)
	.use(router)
