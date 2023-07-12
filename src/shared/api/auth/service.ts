import axios from 'axios'
import { api } from '../api'
import { AuthResData, LoginReqData, RegisterReqData } from './types'

class AuthService {
	register (data: RegisterReqData) {
		const response = api.post<AuthResData>('/auth/register', data)

		return response
	}

	login (data: LoginReqData) {
		const response = api.post<AuthResData>('/auth/login', data)

		return response
	}

	logout () {
		const response = api.get<void>('/auth/logout')

		return response
	}

	refresh () {
		const response = axios.get<AuthResData>(`${ process.env.NEXT_PUBLIC_API_URL }/auth/refresh`, { withCredentials: true })

		return response
	}
}

export const authService = new AuthService