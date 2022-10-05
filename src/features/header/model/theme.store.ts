import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { Ref } from 'vue'

export type ThemeMode = 'dark' | 'light'

export const useThemeStore = defineStore({
	id: 'theme',
	state: (): {
		currentTheme: Ref<ThemeMode>
	} => ({
		currentTheme: useLocalStorage('theme', 'dark') as Ref<ThemeMode>, // (localStorage.getItem('theme') as ThemeMode) || 'dark',
	}),
	actions: {
		initTheme() {
			const { classList } = document.documentElement
			if (this.currentTheme == 'dark') {
				return classList.add('dark')
			}
			return classList.remove('dark')
		},
		toggleTheme() {
			this.currentTheme = this.currentTheme == 'dark' ? 'light' : 'dark'
			this.initTheme()
		},
	},
})
