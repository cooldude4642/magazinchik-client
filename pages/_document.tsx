import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document () {
	return (
		<Html lang='ru'>
			<Head>
				<style>
					{ `:root {}` }
				</style>
			</Head>
			<body>
				<Main/>
				<NextScript/>
			</body>
		</Html>
	)
}