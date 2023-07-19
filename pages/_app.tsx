import NextApp, { AppContext, AppInitialProps, AppProps } from 'next/app'
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
import { AuthResData, queryClient } from 'shared/api'
import { ReactQueryDevtools } from 'react-query/devtools'
import axios from 'axios'
import { Viewer, viewerStore } from 'entities/viewer'

const montserrat = Montserrat({
	weight: ['400', '500', '700', '900'],
	subsets: ['latin', 'cyrillic'],
	fallback: ['Roboto', 'Sans-Serif']
})

interface AppOwnProps {
	viewer?: Viewer
	accessToken?: string
	isAuth?: boolean
	isInitial: boolean
}
 
const App = ({ Component, pageProps, isAuth, accessToken, viewer, isInitial }: AppProps & AppOwnProps) => {
	if (isInitial && typeof window !== 'undefined') {
		store.setTheme(new Theme({}))
	}

	if (isInitial) {
		viewerStore.setIsAuth(isAuth)
		viewerStore.setAccessToken(accessToken)
		viewerStore.setViewer(viewer)
	}

	const start = () => store.setIsPageLoading(true)
	const end = () => store.setIsPageLoading(false)

	useEffect(() => {
		if (localStorage.getItem('darkTheme') === 'true') {
			document.getElementById('root').innerText = store.theme.root.dark
		} else {
			document.getElementById('root').innerText = store.theme.root.light
		}

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

App.getInitialProps = async (context: AppContext): Promise<AppInitialProps & AppOwnProps> => {
	const ctx = await NextApp.getInitialProps(context)
	
	if (context.ctx.req) {
		const cookie = context.ctx.req.headers.cookie

		try {
			const { headers, data: { user, accessToken } } = await axios.get<AuthResData>(`${ process.env.NEXT_PUBLIC_API_URL }/auth/refresh`, { headers: { cookie } })
			context.ctx.res.setHeader('set-cookie', headers['set-cookie'])
		
			return {
				...ctx,
				viewer: user,
				accessToken,
				isAuth: true,
				isInitial: true
			}
		} catch {
			return {
				...ctx,
				viewer: undefined,
				accessToken: undefined,
				isAuth: false,
				isInitial: true
			}
		}
	} else {
		return {
			...ctx,
			isInitial: false
		}
	}
}

export default App