import { defineStore } from 'pinia'

export const useThemeStore = defineStore({
	id: 'theme',
	state: (): {
		currentTheme: 'dark' | 'light'
	} => ({
		currentTheme: (localStorage.getItem('theme') as 'dark' | 'light') || 'dark',
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
			if (this.currentTheme == 'dark') {
				this.currentTheme = 'light'
			} else {
				this.currentTheme = 'dark'
			}
			localStorage.setItem('theme', this.currentTheme)
			this.initTheme()
		},
	},
})
