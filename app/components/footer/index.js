/**
 * Footer component.
 */

import { Component } from 'react';
import css from './style.scss';

class Footer extends Component {

	/**
	 * Render component.
	 *
	 * @return {*}
	 */
	render() {

		const { footer } = this.props;

		return (
			<footer className={ css.footer } >
				<p>© 2018 - <a href="https://rtcamp.com/">rtCamp</a> </p>
				<div>
					<img src={ footer.logo } alt="rtCamp Logo" width="150" />
				</div>
			</footer>
		);

	}
}

export default Footer;
