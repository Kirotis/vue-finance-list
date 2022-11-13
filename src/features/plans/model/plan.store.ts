import { useCategoryStore } from '@/features/categories/model/categories.store'
import { useLogsStore } from '@/features/logs/model/logs.store'
import router from '@/pages'
import { PlanView, EditablePlan, PlanCardView } from '@/shared/types'
import { defineStore } from 'pinia'
import { getPlans, createPlan, editPlan, deletePlan } from '../requests'

interface PlanStore {
	plans: PlanView[]
	isLoading: boolean
	showPopup: boolean
	updateId: string | null
	editableItem: EditablePlan
	formLoading: boolean
}

export const usePlanStore = defineStore('plans', {
	state: (): PlanStore => ({
		plans: [],
		isLoading: false,
		showPopup: false,
		updateId: null,
		editableItem: {},
		formLoading: false,
	}),
	actions: {
		async initStore() {
			this.isLoading = true
			await this.initCategories()
			await this.loadPlans()
			this.isLoading = false
		},
		initCategories() {
			const store = useCategoryStore()
			if (!store.categories?.length) {
				return store.loadCategories()
			}
		},
		loadPlans() {
			this.isLoading = true
			return getPlans()
				.then(items => (this.plans = items))
				.finally(() => {
					this.isLoading = false
				})
		},
		addPlan(newPlan: EditablePlan): Promise<PlanView> {
			this.formLoading = true
			return createPlan(newPlan)
				.then(plan => {
					this.showPopup = false
					this.loadPlans()
					return plan
				})
				.finally(() => (this.formLoading = false))
		},
		removePlan(id: string) {
			return deletePlan(id).finally(() => this.loadPlans())
		},
		updatePlan(id: string, updateItem: EditablePlan): Promise<PlanView> {
			this.formLoading = true
			return editPlan(id, updateItem)
				.then(plan => {
					this.showPopup = false
					this.loadPlans()
					return plan
				})
				.finally(() => (this.formLoading = false))
		},
		getPlanById(searchId: string): { data: PlanView; index: number } {
			const index = this.plans.findIndex(({ id }) => id == searchId)
			if (index < 0) {
				throw new Error('Not found')
			}
			return { data: this.plans[index], index }
		},
		startUpdate(id: string) {
			const { data } = this.getPlanById(id)
			this.editableItem = { ...data }
			this.updateId = id
			this.showPopup = true
		},
		startCreate() {
			this.editableItem = {}
			this.showPopup = true
			this.updateId = null
		},
		goToLogs(plan: PlanView) {
			const logStore = useLogsStore()
			logStore.filter = {
				...logStore.filter,
				categoryFilter: plan.categories,
				endDate: new Date(plan.endDate),
				startDate: new Date(plan.createDate),
			}
			console.log('logStore.filter :>> ', logStore.filter)
			router.push('/')
		},
	},
	getters: {
		plansView(state): PlanCardView[] {
			const categoryStore = useCategoryStore()
			return state.plans.map(item => {
				const categoryNames =
					item.categories?.length > 0
						? 'Categories: ' +
						  item.categories
								.map(
									categoryId =>
										categoryStore.categories?.find(({ id }) => id == categoryId)
											?.name || categoryId
								)
								.join(', ')
						: 'All categories'
				return {
					...item,
					categoryNames,
				}
			})
		},
	},
})
