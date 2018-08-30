/**
 * Layout Component.
 */

import Header from './../header';
import Footer from './../footer';

const Layout = ( props ) => (
	<div>
		<Header header={ props.header }/>
		{ props.children }
		<Footer footer={ props.header }/>
	</div>
);

export default Layout;
