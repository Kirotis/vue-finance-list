import { categories } from '@/entites/categories'
import { ILogView, ILogItem } from '@/shared/types/ILogItem'
import { defineStore } from 'pinia'
import { v4 } from 'uuid'

export type SortModeValues = 'asc' | 'desc'

export interface LogsStoreState {
	logs: ILogItem[]
	sort: SortModeValues
	categoryFilter: string[]
	isLoading: boolean
	showPopup: boolean
	updateId: string | null
	editableItem: Partial<Omit<ILogItem, 'id' | 'date'>>
}

export const useLogsStore = defineStore({
	id: 'logs',
	state: (): LogsStoreState => ({
		logs: [...Array(50)].map((item, index) => ({
			money: 200,
			title: 'test',
			categoryId: (index % 2 + 1).toString(),
			date: new Date(),
			id: v4(),
		})),
		categoryFilter: [],
		sort: 'desc',
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
		logsView: (state: LogsStoreState): ILogView[] => {
			const sortFunction: (a: ILogView, b: ILogView) => number =
				state.sort == 'asc'
					? (a, b) => a.date.valueOf() - b.date.valueOf()
					: (a, b) => b.date.valueOf() - a.date.valueOf()
			const filtredLogs =
				state.categoryFilter.length > 0
					? state.logs.filter(({ categoryId }) =>
							state.categoryFilter.includes(categoryId)
					  )
					: state.logs
			const logs = filtredLogs
				.map<ILogView>(({ categoryId, ...item }) => {
					const category = categories.find(({ id }) => categoryId == id)
					return {
						...item,
						category: category?.name,
						iconSrc: category?.icon,
					}
				})
				.sort(sortFunction)
			return logs
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
