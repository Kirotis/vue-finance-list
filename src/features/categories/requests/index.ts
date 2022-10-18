import { ICategory } from '@/shared/types'
import { constructBaseRequest } from '@/shared/lib'

const categoryBaseRequest = constructBaseRequest('categories')

export function getCategories(): Promise<ICategory[]> {
	return categoryBaseRequest<ICategory[]>('GET').catch(() => [])
}

export function deleteCategory(id: string): Promise<void> {
	return categoryBaseRequest<void>('DELETE', id)
}

export function createCategory(
	category: Pick<ICategory, 'name' | 'image'>
): Promise<ICategory> {
	return categoryBaseRequest<ICategory>('POST', '', category)
}

export function updateCategory(
	id: string,
	category: Pick<ICategory, 'name' | 'image'>
): Promise<ICategory> {
	return categoryBaseRequest<ICategory>('PATCH', id, category)
}
