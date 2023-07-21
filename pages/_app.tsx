import { AppProps } from 'next/app'
import '../src/shared/styles/root.sass'
import 'normalize.css'
import { Montserrat } from 'next/font/google'
import cn from 'classnames'
import { MainLayout } from 'layouts/MainLayout'
import { AnimatePresence } from 'framer-motion'
import { PageMotionWrapper } from 'shared/ui/PageMotionWrapper'
import { QueryClientProvider } from 'react-query'
import { queryClient } from 'shared/api'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useRefresh } from 'features/auth/model/useRefresh'
import { usePageLoading } from 'shared/lib/hooks'

const montserrat = Montserrat({
	weight: ['400', '500', '700', '900'],
	subsets: ['latin', 'cyrillic'],
	fallback: ['Roboto', 'Sans-Serif']
})
 
const App = ({ Component, pageProps }: AppProps) => {
	useRefresh()
	usePageLoading()
	
	return (
		<QueryClientProvider client={ queryClient }>
			<MainLayout className={ cn(montserrat.className) }>
				<AnimatePresence>
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