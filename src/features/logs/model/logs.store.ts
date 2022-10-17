import { ICategory } from '@/entites/categories'
import { ILogView, ILogItem } from '@/shared/types/ILogItem'
import { defineStore } from 'pinia'
import { getLogs, createLog, editLog } from '../requests'
import { getCategories } from '@/features/categories/requests'

export type SortModeValues = 'asc' | 'desc'

export interface LogsStoreState {
	logs: ILogItem[]
	isLoading: boolean
	showPopup: boolean
	updateId: string | null
	editableItem: Partial<Omit<ILogItem, 'id' | 'date'>>
	filter: LogsFilterState
	showFilterPopup: boolean
	categories: ICategory[]
	formLoading: boolean
}

export interface LogsFilterState {
	categoryFilter: string[]
	sort: SortModeValues
	search?: string
	startDate?: Date
	endDate?: Date
}

export const useLogsStore = defineStore({
	id: 'logs',
	state: (): LogsStoreState => ({
		logs: [],
		filter: {
			categoryFilter: [],
			sort: 'desc',
		},
		showFilterPopup: false,
		isLoading: false,
		showPopup: false,
		updateId: null,
		editableItem: {},
		categories: [],
		formLoading: false,
	}),
	actions: {
		loadLogs() {
			this.isLoading = true
			return getLogs(this.filter)
				.then(items => (this.logs = items))
				.finally(() => {
					this.isLoading = false
				})
		},
		async initStore() {
			this.isLoading = true
			await this.initCategories()
			await this.loadLogs()
			this.isLoading = false
		},
		async initCategories() {
			return (this.categories = await getCategories())
		},
		addLog(newLog: Omit<ILogItem, 'id' | 'date'>): Promise<ILogItem> {
			this.formLoading = true
			return createLog(newLog)
				.then(log => {
					this.showPopup = false
					this.loadLogs()
					return log
				})
				.finally(() => (this.formLoading = false))
		},
		removeLog(id: string): ILogItem {
			const { index } = this.getLogById(id)
			const [item] = this.logs.splice(index, 1)
			return item
		},
		updateLog(
			id: string,
			updateItem: Omit<ILogItem, 'id' | 'date'>
		): Promise<ILogItem> {
			this.formLoading = true
			return editLog(id, updateItem)
				.then(log => {
					this.showPopup = false
					this.loadLogs()
					return log
				})
				.finally(() => (this.formLoading = false))
		},
		updateFilter(
			event: Pick<LogsFilterState, 'startDate' | 'endDate' | 'categoryFilter'>
		) {
			this.filter = {
				...this.filter,
				...event,
			}
			this.showFilterPopup = false
			return this.loadLogs()
		},
		getLogById(searchId: string): { data: ILogItem; index: number } {
			const index = this.logs.findIndex(({ id }) => id == searchId)
			if (index < 0) {
				throw new Error('Not found')
			}
			return { data: this.logs[index], index }
		},
		startUpdate(id: string) {
			const { data } = this.getLogById(id)
			this.editableItem = { ...data }
			this.showPopup = true
			this.updateId = id
		},
		startCreate() {
			this.editableItem = {}
			this.showPopup = true
			this.updateId = null
		},
	},
	getters: {
		logsView: (state): ILogView[] => {
			const logs = state.logs.map<ILogView>(log => {
				const category = state.categories.find(({ id }) => log.categoryId == id)
				return {
					...log,
					category: category?.name,
					iconSrc: category?.image,
				}
			})
			return logs
		},
	},
})
