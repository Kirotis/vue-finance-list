import { useAuthStore } from '@/features/auth/model/auth.store'

const baseURL: string =
	process.env.VUE_APP_BACKEND_URL ?? 'http://localhost:3001'
export function constructBaseRequest(controllerName: string) {
	const baseController = `${baseURL}/api/${controllerName}`
	return <T>(
		method: 'POST' | 'PATCH' | 'DELETE' | 'GET',
		path = '',
		body?: object
	) => {
		const { token } = useAuthStore()

		return fetch(`${baseController}/${path}`, {
			body: JSON.stringify(body),
			method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}).then(response => handleResponse<T>(response))
	}
}
function handleResponse<T>(response: Response): Promise<T> {
	return response.text().then(text => {
		try {
			const data: T = text && JSON.parse(text)
			if (!response.ok) {
				const { logout } = useAuthStore()
				const errorStatuses = [401, 403]
				if (errorStatuses.includes(response.status)) {
					logout()
				}

				return Promise.reject(data)
			}

			return data
		} catch {
			throw text
		}
	})
}
