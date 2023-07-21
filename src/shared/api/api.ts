import axios from 'axios'
import { viewerStore } from 'entities/viewer'
import { authService } from './auth'
import { useRouter } from 'next/router'

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

		if (error.response.status && interceptedResponse.isRetry !== true) {
			interceptedResponse.isRetry = true

			try {
				const response = await authService.refresh()
				const { accessToken, user } = response.data
				viewerStore.setViewer(user)
				viewerStore.setAccessToken(accessToken)
				viewerStore.setIsAuth(true)

				return api.request(interceptedResponse)
			} catch (err) {
				viewerStore.setViewer(undefined)
				viewerStore.setAccessToken(undefined)
				viewerStore.setIsAuth(true)

				if (typeof window !== 'undefined') {
					const router = useRouter()
					router.asPath = '/'
				}

				throw error
			}
		} else {
			throw error
		}
	}
)

export { api }