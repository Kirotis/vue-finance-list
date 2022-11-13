import { constructBaseRequest } from '@/shared/lib'
import { ILogItem } from '@/shared/types/ILogItem'
import { LogsFilterState } from '../model/logs.store'

const logBaseRequest = constructBaseRequest('log')

export function getLogs(filter: LogsFilterState): Promise<ILogItem[]> {
	return logBaseRequest<ILogItem[]>('POST', 'filter', filter).catch(() => [])
}

export function getLogsPagination(
	filter: LogsFilterState,
	skipItems: number,
	takeItems: number
): Promise<ILogItem[]> {
	return logBaseRequest<ILogItem[]>('POST', 'pagination', {
		...filter,
		skipItems,
		takeItems,
	}).catch(() => [])
}

export function editLog(
	id: string,
	log: Pick<ILogItem, 'categoryId' | 'money' | 'title'>
): Promise<ILogItem> {
	return logBaseRequest<ILogItem>('PATCH', id, log)
}

export function createLog(
	log: Pick<ILogItem, 'categoryId' | 'money' | 'title'>
): Promise<ILogItem> {
	return logBaseRequest<ILogItem>('POST', '', log)
}
