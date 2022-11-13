import { constructBaseRequest } from '@/shared/lib'
import { IUser } from "../../../shared/types/IUserStore"

const authBaseRequest = constructBaseRequest('auth')

export const login = (
	login: string,
	password: string
): Promise<{ access_token: string }> =>
	authBaseRequest('POST', 'login', { login, password })

export const getUser = (): Promise<IUser> => authBaseRequest('GET', 'profile')
