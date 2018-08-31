/**
 * Page component.
 *
 * @package rt-react-theme
 */

import { Component } from 'react';
import Layout from './../components/layout'
import fetch from 'isomorphic-unfetch'
import { APIURL } from "../../config/env";
import { createMarkup } from './../utils';
import { connect } from 'react-redux';
import { actionTypes } from './../store';

class Page extends Component {

	/**
	 * Get initial props.
	 *
	 * @param {object} context Context.
	 *
	 * @return {object}
	 */
	static async getInitialProps( { query, reduxStore } ) {

		if ( ! reduxStore.getState().page.slug || query.slug !== reduxStore.getState().page.slug ) {
			const PageRes = await fetch( `${APIURL}/wp/v2/pages?slug=${query.slug}` );
			const page = await PageRes.json();
			reduxStore.dispatch( { type: actionTypes.UPDATE_PAGE, payload: page[0] } );
		}

		// Triggers when directly accessed.
		if ( 0 ===  Object.keys( reduxStore.getState().header ).length ) {
			const header = await fetch( APIURL + '/rt/v1/header');
			const headerData = await header.json();
			reduxStore.dispatch( { type: actionTypes.UPDATE_HEADER, payload: headerData } );
		}

		return {};
	}

	/**
	 * Render component.
	 *
	 * @return {*}
	 */
	render() {

		const { header, page } = this.props;

		return (
			<Layout header={ header } >
				{ page && (
					<div>
						<h1>
							{ page.title.rendered }
						</h1>
						<div dangerouslySetInnerHTML={ createMarkup( page.content.rendered ) } />
					</div>
				) }
			</Layout>
		);
	}
}

export default connect( ( state ) => {
	return {
		header: state.header,
		page: state.page
	}
} )( Page );

