import router from '@/pages'
import { IUser, IUserStore } from '@/shared/types'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { getUser, login } from '../requsets'

export const useAuthStore = defineStore({
	id: 'auth',
	state: (): IUserStore => ({
		routerNavigate: '/',
		token: useLocalStorage<string>('token', null), // localStorage.getItem('token') || undefined,
	}),
	actions: {
		login(username: string, password: string) {
			return login(username, password)
				.then(({ access_token }) => {
					this.token = access_token
					return this.getUserProfile()
				})
				.then(user => {
					router.push('/')
					return user
				})
		},

		getUserProfile(): Promise<IUser> {
			return getUser().then(user => {
				return (this.user = user)
			})
		},

		logout() {
			this.user = undefined
			localStorage.removeItem('user')
			// console.log('router :>> ', router)
			router.push('/login')
		},
	},
	getters: {
		isAuthorized(state): boolean {
			return !!(state.token && state.token.length > 0)
		},
	},
})
