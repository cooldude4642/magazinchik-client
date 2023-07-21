import { viewerStore } from 'entities/viewer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { authService } from 'shared/api'

export const useRefresh = () => {
	const router = useRouter()

	useEffect(() => {
		authService.refresh()
			.then(({ data: { user, accessToken } }) => {
				viewerStore.setViewer(user)
				viewerStore.setAccessToken(accessToken)
				viewerStore.setIsAuth(true)
			})
			.catch(() => {
				viewerStore.setAccessToken(undefined)
				router.push('/')
			})
	}, [])
}