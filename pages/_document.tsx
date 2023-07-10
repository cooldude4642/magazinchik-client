import { Html, Head, Main, NextScript } from 'next/document'
import { createTheme, createThemeVariables, createThemeRoot } from 'shared/lib/theme'
 
export default function Document () {
	const theme = createTheme({})
	const themeVariables = createThemeVariables(theme)
	const root = createThemeRoot(themeVariables)

	return (
		<Html lang='ru'>
			<Head>
				<style id='root'>
					{ `:root { ${ root.scheme.light } ${ root.typography } ${ root.elevations };` }
				</style>
			</Head>
			<body>
				<Main/>
				<NextScript/>
			</body>
		</Html>
	)
}