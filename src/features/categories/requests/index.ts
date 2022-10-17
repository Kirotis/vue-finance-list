import { ICategory } from '@/entites/categories'
import { constructBaseRequest } from '@/shared/lib'

const categoryBaseRequest = constructBaseRequest('categories')

export function getCategories(): Promise<ICategory[]> {
	return categoryBaseRequest<ICategory[]>('GET').catch(() => [])
}
