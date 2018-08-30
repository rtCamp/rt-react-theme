/**
 * Layout Component.
 */

import css from './style.scss';
import Header from './../header';
import Footer from './../footer';

const Layout = ( props ) => (
	<div>
		<Header header={ props.header }/>
		<main id="main" className={ css.main } >
			{ props.children }
		</main>
		<Footer footer={ props.header }/>
	</div>
);

export default Layout;
