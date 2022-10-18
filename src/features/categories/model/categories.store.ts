import { ICategory } from '@/shared/types'
import { defineStore } from 'pinia'
import {
	createCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from '../requests'

export interface ICategoryState {
	categories: ICategory[]
	editableItem: Partial<Pick<ICategory, 'name' | 'image'>>
	updateId: string | null
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
		updateId: null,
		editableItem: {},
	}),
	actions: {
		loadCategories(): Promise<ICategory[]> {
			this.loading = true
			return getCategories()
				.then(categories => (this.categories = categories))
				.finally(() => (this.loadingPopup = false))
		},
		async deleteCategory(id: string) {
			await deleteCategory(id)
			await this.loadCategories()
		},
		startEdit(editableId: string) {
			this.updateId = editableId
			const item = this.categories.find(({ id }) => editableId == id)

			this.editableItem = {
				image: item?.image,
				name: item?.name,
			}
			this.showPopup = true
		},
		startCreate() {
			this.updateId = null
			this.editableItem = {}
			this.showPopup = true
		},
		create(category: Pick<ICategory, 'name' | 'image'>) {
			this.loadingPopup = true
			createCategory(category)
				.then(() => {
					this.loadCategories()
					this.showPopup = false
				})
				.finally(() => (this.loadingPopup = false))
		},
		edit(id: string, category: Pick<ICategory, 'name' | 'image'>) {
			this.loadingPopup = true
			updateCategory(id, category)
				.then(() => {
					this.loadCategories()
					this.showPopup = false
				})
				.finally(() => (this.loadingPopup = false))
		},
	},
})
