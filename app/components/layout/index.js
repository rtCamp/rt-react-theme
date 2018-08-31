/**
 * Layout Component.
 */

import css from './style.scss';
import Header from './../header';
import Footer from './../footer';
import { Component } from 'react';

class Layout extends Component {

	/**
	 * Render component.
	 *
	 * @return {*}
	 */
	render() {

		const { header, children } = this.props;

		return (
			<div id="page" className={ css.page } >
				<Header header={ header }/>
				<main id="main" className={ css.main } >
					{ children }
				</main>
				<Footer footer={ header }/>
			</div>
		);

	}
}

export default Layout;
