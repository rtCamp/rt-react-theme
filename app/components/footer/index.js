/**
 * Footer component.
 */

import css from './style.scss';

const Footer = ( props ) => (
	<footer className={ css.footer } >
		<p>© 2018 - <a href="https://rtcamp.com/">rtCamp</a> </p>
		<div>
			<img src={ props.footer.logo } alt="Site Log" width="150" />
		</div>
	</footer>
);

export default Footer;
