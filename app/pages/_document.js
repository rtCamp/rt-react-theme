/**
 * Rt react theme document.
 *
 * @package rt-react-theme
 */

import css from "../static/sass/style.scss";
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
					<main id="main" className={ css.main }>
						<Main />
					</main>
					<NextScript />
				</body>
			</html>
		)
	}
}
