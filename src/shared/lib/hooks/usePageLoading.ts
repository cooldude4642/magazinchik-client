import { Router } from 'next/router'
import { store } from '../store'
import { useEffect } from 'react'

export const usePageLoading = () => {
	const start = () => store.setIsPageLoading(true)
	const end = () => store.setIsPageLoading(false)

	useEffect(() => {
		Router.events.on('routeChangeStart', start)
		Router.events.on('routeChangeComplete', end)
		Router.events.on('routeChangeError', end)

		return () => {
			Router.events.off('routeChangeStart', start)
			Router.events.off('routeChangeComplete', end)
			Router.events.off('routeChangeError', end)
		}
	}, [])
}