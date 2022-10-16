const baseURL: string =
	process.env.VUE_APP_BACKEND_URL ?? 'http://localhost:3001'
export function constructBaseRequest(controllerName: string) {
	const baseController = `${baseURL}/api/${controllerName}`
	return <T>(
		method: 'POST' | 'PATCH' | 'DELETE' | 'GET',
		path = '',
		body?: object
	) =>
		fetch(`${baseController}/${path}`, {
			body: JSON.stringify(body),
			method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then((response): Promise<T> => response.json())
}
