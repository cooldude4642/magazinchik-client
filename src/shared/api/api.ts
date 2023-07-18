import axios from 'axios'
import { Viewer, viewerStore } from 'entities/viewer'
import { authService } from './auth'
import { authStore } from 'features/auth'

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true
})

api.interceptors.request.use((config) => {
	if (viewerStore.accessToken) {
		config.headers.Authorization = `Bearer ${ viewerStore.accessToken }`
	}

	return config
})

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const interceptedResponse = error.config as typeof error.config & { isRetry: boolean }

		try {
			if (error.response.status === 401 && interceptedResponse.isRetry !== true) {
				interceptedResponse.isRetry = true
				const response = await authService.refresh()
				const { accessToken, user } = response.data
				viewerStore.setViewer(user)
				viewerStore.setAccessToken(accessToken)
				viewerStore.setIsAuth(true)
	
				return api.request(interceptedResponse)
			} else {
				viewerStore.setAccessToken(undefined)
				viewerStore.setViewer(undefined)
				viewerStore.setIsAuth(false)
				
				throw error
			}
		} catch {
			viewerStore.setAccessToken(undefined)
			viewerStore.setViewer(undefined)
			viewerStore.setIsAuth(false)
			
			throw error
		}
	}
)

export { api }