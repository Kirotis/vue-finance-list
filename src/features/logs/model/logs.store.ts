import { ILogItem } from '@/shared/types/ILogItem'
import { defineStore } from 'pinia'
import { v4 } from 'uuid'

export type SortModeValues = 'asc' | 'desc'

export interface LogsStoreState {
	logs: ILogItem[]
	sort: SortModeValues
	isLoading: boolean
	showPopup: boolean
	editableItem: Partial<Omit<ILogItem, 'id' | 'date'>>
}

export const useLogsStore = defineStore({
	id: 'logs',
	state: (): LogsStoreState => ({
		logs: [
			{
				money: 200,
				title: 'test',
				category: 'test',
				date: new Date(),
				id: v4(),
			},
			{
				money: 200,
				title: 'test',
				category: 'test',
				date: new Date(2018, 5, 0, 5, 2),
				id: v4(),
			},
		],
		sort: 'asc',
		isLoading: false,
		showPopup: false,
		editableItem: {},
	}),
	actions: {
		addLog(newLog: Omit<ILogItem, 'id' | 'date'>): ILogItem {
			const log: ILogItem = {
				...newLog,
				date: new Date(),
				id: v4(),
			}
			this.logs.push(log)
			return log
		},
		removeLog(id: string): ILogItem {
			const { index } = this.getLogById(id)
			const [item] = this.logs.splice(index, 1)
			this.showPopup = false
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
		},
		startCreate() {
			this.editableItem = {}
			this.showPopup = true
		},
	},
	getters: {
		logsView: (state: LogsStoreState): ILogItem[] => {
			const sortFunction: (a: ILogItem, b: ILogItem) => number =
				state.sort == 'asc'
					? (a, b) => a.date.valueOf() - b.date.valueOf()
					: (a, b) => b.date.valueOf() - a.date.valueOf()
			return state.logs.sort(sortFunction)
		},
	},
})
