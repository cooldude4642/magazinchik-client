import { viewerStore } from 'entities/viewer'
import { useEffect } from 'react'
import { authService } from 'shared/api'

export const useRefresh = () => {
	useEffect(() => {
		authService.refresh()
			.then(({ data: { user, accessToken } }) => {
				console.log(accessToken)
				viewerStore.setViewer(user)
				viewerStore.setAccessToken(accessToken)
				viewerStore.setIsAuth(true)
			})
			.catch(() => {
				viewerStore.setViewer(undefined)
				viewerStore.setAccessToken(undefined)
				viewerStore.setIsAuth(false)
			})
	}, [])
}