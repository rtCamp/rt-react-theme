import Header from './Header'

const Layout = ( props ) => (
	<div>
		<Header header={props.header} />
		{ props.children }
	</div>
);

export default Layout;
