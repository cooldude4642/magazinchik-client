import { viewerStore } from 'entities/viewer'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { authService } from 'shared/api'

export const useLogout = () => {
	const router = useRouter()

	const query = useQuery({
		queryKey: 'logout',
		queryFn: authService.logout,
		onSuccess: () => {
			viewerStore.setViewer(undefined)
			viewerStore.setAccessToken(undefined)
			viewerStore.setIsAuth(false)
			router.push('/')
		},
		onError: () => {
			viewerStore.setViewer(undefined)
			viewerStore.setAccessToken(undefined)
			viewerStore.setIsAuth(false)
			router.push('/')
		},
		enabled: false
	})

	return query
}