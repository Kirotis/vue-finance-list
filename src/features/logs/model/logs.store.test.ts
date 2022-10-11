import { ILogItem } from '@/shared/types/ILogItem'
import { createPinia, setActivePinia } from 'pinia'
import { useLogsStore } from './logs.store'
import { v4 } from 'uuid'

describe('Logs store', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
		// const logsStore = useLogsStore()
	})

	it.skip('Check state', () => {
		const logsStore = useLogsStore()
		expect(Array.isArray(logsStore.logs)).toBe(true)
		// expect(logsStore.sort).toBe('desc')
	})

	describe('CRUD logs', () => {
		function createLog() {
			const logsStore = useLogsStore()
			const oldLength = logsStore.logs.length
			const newLog: Omit<ILogItem, 'id' | 'date'> = {
				categoryId: '1',
				money: 123,
				title: v4(),
			}
			const createdLog = logsStore.addLog(newLog)
			expect(createdLog).toEqual(expect.objectContaining(newLog))

			expect(logsStore.logs.length).toBe(oldLength + 1)
			expect(logsStore.logs).toEqual(
				expect.arrayContaining([expect.objectContaining(newLog)])
			)
			return createdLog
		}
		it('Add log', () => {
			createLog()
		})
		it('Update log', () => {
			const logsStore = useLogsStore()
			const log = createLog()
			const updateLog: ILogItem = {
				...log,
				title: v4(),
			}
			logsStore.updateLog(log.id, updateLog)

			expect(logsStore.logs).not.toEqual(
				expect.arrayContaining([expect.objectContaining(log)])
			)
			expect(logsStore.logs).toEqual(
				expect.arrayContaining([expect.objectContaining(updateLog)])
			)

			expect(() => logsStore.updateLog(v4(), updateLog)).toThrowError()
		})
		it('Remove log', () => {
			const logsStore = useLogsStore()
			const addedItem = createLog()
			logsStore.removeLog(addedItem.id)
			expect(logsStore.logs).not.toEqual(
				expect.arrayContaining([expect.objectContaining(addedItem)])
			)
			expect(() => logsStore.removeLog(v4())).toThrowError()
		})
	})

	it.skip('Sort logs', () => {
		const logsStore = useLogsStore()
	})

	it.skip('Search logs', () => {
		const logsStore = useLogsStore()
	})
})
