import { Html, Head, Main, NextScript } from 'next/document'
import { createTheme } from 'shared/lib/theme/theme'
 
export default function Document () {
	const theme = createTheme()

	return (
		<Html lang='ru'>
			<Head>
				<style id='root'>{ theme.root }</style>
			</Head>
			<body>
				<Main/>
				<NextScript/>
			</body>
		</Html>
	)
}