/**
 * Rt react theme document.
 *
 * @package rt-react-theme
 */

import css from "../static/sass/style.scss";
import Document, { Head, Main, NextScript } from 'next/document'

export default class RtReactThemeDocument extends Document {
	render() {
		return (
			<html>
				<Head>
					<link rel="stylesheet" href="/_next/static/style.css" />
				</Head>
				<body>
					<main id="main" className={css.main}>
						<Main />
					</main>
					<NextScript />
				</body>
			</html>
		)
	}
}
