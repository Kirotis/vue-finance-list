import { categories } from '@/entites/categories'
import { ILogView, ILogItem } from '@/shared/types/ILogItem'
import { defineStore } from 'pinia'
import { v4 } from 'uuid'

export type SortModeValues = 'asc' | 'desc'

export interface LogsStoreState {
	logs: ILogItem[]
	isLoading: boolean
	showPopup: boolean
	updateId: string | null
	editableItem: Partial<Omit<ILogItem, 'id' | 'date'>>
	filter: LogsFilterState
	showFilterPopup: boolean
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
		logs: [...Array(50)].map((item, index) => {
			const date = new Date()
			date.setDate(date.getDate() - index)
			return {
				money: 200,
				title: 'test' + index,
				categoryId: ((index % 2) + 1).toString(),
				date,
				id: v4(),
			}
		}),
		filter: {
			categoryFilter: [],
			sort: 'desc',
		},
		showFilterPopup: false,
		isLoading: false,
		showPopup: false,
		updateId: null,
		editableItem: {},
	}),
	actions: {
		addLog(newLog: Omit<ILogItem, 'id' | 'date'>): ILogItem {
			const log: ILogItem = {
				...newLog,
				date: new Date(),
				id: v4(),
			}
			this.logs = [...this.logs, log]
			this.showPopup = false
			return log
		},
		removeLog(id: string): ILogItem {
			const { index } = this.getLogById(id)
			const [item] = this.logs.splice(index, 1)
			return item
		},
		updateLog(id: string, updateItem: Omit<ILogItem, 'id' | 'date'>): ILogItem {
			const { data, index } = this.getLogById(id)
			this.showPopup = false
			return (this.logs[index] = {
				...data,
				...updateItem,
			})
		},
		updateFilter(
			event: Pick<LogsFilterState, 'startDate' | 'endDate' | 'categoryFilter'>
		) {
			this.filter = {
				...this.filter,
				...event,
			}
			this.showFilterPopup = false
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
			const sortFunction: (a: ILogView, b: ILogView) => number =
				state.filter.sort == 'asc'
					? (a, b) => a.date.valueOf() - b.date.valueOf()
					: (a, b) => b.date.valueOf() - a.date.valueOf()
			const filtredLogs = state.logs.filter(({ categoryId, date, title }) => {
				const categoryFilter = state.filter.categoryFilter.length
					? state.filter.categoryFilter.includes(categoryId)
					: true
				const startDate = state.filter.startDate
					? date.valueOf() >= state.filter.startDate.valueOf()
					: true
				const endDate = state.filter.endDate
					? date.valueOf() <= state.filter.endDate.valueOf()
					: true
				const search = state.filter.search
					? title.includes(state.filter.search)
					: true
				return categoryFilter && startDate && endDate && search
			})

			const logs = filtredLogs
				.map<ILogView>(log => {
					const category = categories.find(({ id }) => log.categoryId == id)
					return {
						...log,
						category: category?.name,
						iconSrc: category?.icon,
					}
				})
				.sort(sortFunction)
			return logs
		},
		chartData(): { name: string; value: number }[] {
			return categories.map(({ name, id }) => ({
				name,
				value: this.logsView
					.filter(({ categoryId }) => categoryId == id)
					.reduce((sum, { money }) => sum + money, 0),
			}))
		},
	},
})
// export const useLogsView = defineStore('logsView', () => {
// 	const store = useLogsStore()
// 	const logsView = computed(() => {
// 		const sortFunction: (a: ILogItem, b: ILogItem) => number =
// 			store.sort == 'asc'
// 				? (a, b) => a.date.valueOf() - b.date.valueOf()
// 				: (a, b) => b.date.valueOf() - a.date.valueOf()
// 		const logs = store.logs.sort(sortFunction)
// 		console.log('logs :>> ', logs)
// 		return logs
// 	})
// 	return {logsView}
// })
