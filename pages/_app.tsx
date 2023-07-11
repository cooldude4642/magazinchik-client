import { AppProps } from 'next/app'
import '../src/shared/styles/root.sass'
import 'normalize.css'
import { Montserrat, Roboto } from 'next/font/google'
import cn from 'classnames'
import { store } from 'shared/lib/store'
import { Theme } from 'shared/lib/theme'
import { MainLayout } from 'layouts/MainLayout'

const montserrat = Montserrat({
	weight: ['400', '500', '700', '900'],
	subsets: ['latin', 'cyrillic'],
	fallback: ['Roboto', 'Sans-Serif']
})
 
const App = ({ Component, pageProps }: AppProps) => {
	typeof window !== 'undefined' && store.setTheme(new Theme({}))
	
	return (
		<MainLayout className={ cn(montserrat.className) }>
			<Component { ...pageProps }/>
		</MainLayout>
	)
}

export default App