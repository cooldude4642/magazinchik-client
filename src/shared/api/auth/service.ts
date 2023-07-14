import axios from 'axios'
import { AuthResData, LoginReqData, RegisterReqData } from './types'

class AuthService {
	register (data: RegisterReqData) {
		const response = axios.post<AuthResData>(`${ process.env.NEXT_PUBLIC_API_URL }/auth/register`, data, { withCredentials: true })

		return response
	}

	login (data: LoginReqData) {
		const response = axios.post<AuthResData>(`${ process.env.NEXT_PUBLIC_API_URL }/auth/login`, data, { withCredentials: true })

		return response
	}

	logout () {
		const response = axios.get<void>(`${ process.env.NEXT_PUBLIC_API_URL }/auth/logout`, { withCredentials: true })

		return response
	}

	refresh () {
		const response = axios.get<AuthResData>(`${ process.env.NEXT_PUBLIC_API_URL }/auth/refresh`, { withCredentials: true })

		return response
	}
}

export const authService = new AuthService