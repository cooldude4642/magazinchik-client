import type { AppProps } from 'next/app'
import '../src/shared/styles/root.sass'
import 'normalize.css'
import { Montserrat } from 'next/font/google'
import cn from 'classnames'
import { useEffect } from 'react'

const montserrat = Montserrat({
	weight: ['400', '500', '700', '900'],
	subsets: ['latin', 'cyrillic']
})
 
const App = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		document.documentElement.style.setProperty('--main-background-color', 'green')
	}, [])
	
	return (
		<div className={ cn(montserrat.className) }>
			<Component { ...pageProps }/>
		</div>
	)
}

export default App