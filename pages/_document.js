/**
 * Rt react theme document.
 *
 * @package rt-react-theme
 */

import Document, { Head, Main, NextScript } from 'next/document'

export default class RtReactThemeDocument extends Document {
	render() {
		return (
			<html>
				<Head>
					<link rel="stylesheet" href="/_next/static/style.css" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}
