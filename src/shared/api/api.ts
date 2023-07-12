import axios from 'axios'
import { viewerStore } from 'entities/viewer'
import { authService } from './auth'

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true
})

api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${ typeof window !== 'undefined' && localStorage.getItem('accessToken') || '' }`

	return config
})

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const interceptedResponse = error.config as typeof error.config & { isRetry: boolean }
		
		if (error.response.status === 401 && interceptedResponse.isRetry !== true) {
			interceptedResponse.isRetry = true
			const response = await authService.refresh()
			const { accessToken, user } = response.data
			viewerStore.setViewer(user)
			viewerStore.setAccessToken(accessToken)
			viewerStore.setIsAuth(true)

			return api.request(interceptedResponse)
		} else {
			throw error
		}
	}
)

export { api }