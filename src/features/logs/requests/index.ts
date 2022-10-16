import { ICategories } from '@/entites/categories'
import { ILogItem } from '@/shared/types/ILogItem'
import { LogsFilterState } from '../model/logs.store'
import { constructBaseRequest } from './constructBaseRequest'

const logBaseRequest = constructBaseRequest('log')
const categoryBaseRequest = constructBaseRequest('categories')

export function getLogs(filter: LogsFilterState): Promise<ILogItem[]> {
	return logBaseRequest<ILogItem[]>('POST', 'filter', filter).catch(() => [])
}

export function getCategories(): Promise<ICategories[]> {
	return categoryBaseRequest<ICategories[]>('GET').catch(() => [])
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
