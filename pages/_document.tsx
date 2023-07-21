import { Html, Head, Main, NextScript, DocumentProps, DocumentContext, DocumentInitialProps } from 'next/document'
import { Theme } from 'shared/lib/theme'
 
export default function Document () {
	const theme = Theme.CreateTheme()

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