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
import { AnimatePresence, motion } from 'framer-motion'
import { MotionWrapper } from 'shared/ui/MotionWrapper'

const montserrat = Montserrat({
	weight: ['400', '500', '700', '900'],
	subsets: ['latin', 'cyrillic'],
	fallback: ['Roboto', 'Sans-Serif']
})
 
const App = ({ Component, pageProps, router }: AppProps) => {
	typeof window !== 'undefined' && store.setTheme(new Theme({}))

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
		<MainLayout className={ cn(montserrat.className) }>
			<AnimatePresence initial={ false }>
				<MotionWrapper>
					<Component { ...pageProps }/>
				</MotionWrapper>
			</AnimatePresence>
		</MainLayout>
	)
}

export default App