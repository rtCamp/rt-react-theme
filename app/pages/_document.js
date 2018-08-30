/**
 * Rt react theme document.
 *
 * @package rt-react-theme
 */

import Document, { Head, Main, NextScript } from 'next/document'

const styleSheet = '/_next/static/style.css';

export default class RtReactThemeDocument extends Document {
	render() {
		return (
			<html>
				<Head>
					<link rel="stylesheet" href={ styleSheet } />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}
