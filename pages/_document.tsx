import { Html, Head, Main, NextScript } from 'next/document'
import { Theme } from 'shared/lib/theme'
 
export default function Document () {
	const theme = new Theme({})

	return (
		<Html lang='ru'>
			<Head>
				<style id='root'>{ theme.root.light }</style>
			</Head>
			<body>
				<Main/>
				<NextScript/>
			</body>
		</Html>
	)
}