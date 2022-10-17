import { ICategory } from '@/entites/categories'
import { defineStore } from 'pinia'
import { getCategories } from '../requests'

export interface ICategoryState {
	categories: ICategory[]
	selectedCategory?: ICategory | null
	loading: boolean
	showPopup: boolean
	loadingPopup: boolean
}

export const useCategoryStore = defineStore('category', {
	state: (): ICategoryState => ({
		categories: [],
		loading: false,
		showPopup: false,
		loadingPopup: false,
	}),
	actions: {
		async loadCategories(): Promise<ICategory[]> {
			this.loading = true
			return getCategories()
				.then(categories => (this.categories = categories))
				.finally(() => (this.loadingPopup = false))
		},
	},
})
