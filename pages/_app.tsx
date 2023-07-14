import { AppProps } from 'next/app'
import '../src/shared/styles/root.sass'
import 'normalize.css'
import { Montserrat } from 'next/font/google'
import cn from 'classnames'
import { store } from 'shared/lib/store'
import { Theme } from 'shared/lib/theme'
import { MainLayout } from 'layouts/MainLayout'
import { Router } from 'next/router'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PageMotionWrapper } from 'shared/ui/PageMotionWrapper'
import { QueryClientProvider } from 'react-query'
import { queryClient } from 'shared/api'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useRefresh } from 'features/auth/model/useRefresh'
import { viewerStore } from 'entities/viewer'

const montserrat = Montserrat({
	weight: ['400', '500', '700', '900'],
	subsets: ['latin', 'cyrillic'],
	fallback: ['Roboto', 'Sans-Serif']
})
 
const App = ({ Component, pageProps }: AppProps) => {
	if (typeof window !== 'undefined') {
		store.setTheme(new Theme({}))
	}

	useRefresh()

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
	
	return (
		<QueryClientProvider client={ queryClient }>
			<MainLayout className={ cn(montserrat.className) }>
				<AnimatePresence initial={ false }>
					<PageMotionWrapper>
						<Component { ...pageProps }/>
					</PageMotionWrapper>
				</AnimatePresence>
			</MainLayout>
			<ReactQueryDevtools initialIsOpen={ false }/>
		</QueryClientProvider>
	)
}

export default App