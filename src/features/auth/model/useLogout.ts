import { viewerStore } from 'entities/viewer'
import { useQuery } from 'react-query'
import { authService } from 'shared/api'

export const useLogout = () => {
	const query = useQuery({
		queryKey: 'logout',
		queryFn: authService.logout,
		onSuccess: () => {
			viewerStore.setAccessToken(undefined)
			window.location.href = '/'
		},
		onError: () => {
			viewerStore.setAccessToken(undefined)
			window.location.href = '/'
		},
		enabled: false
	})

	return query
}