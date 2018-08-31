/**
 * Page component.
 *
 * @package rt-react-theme
 */

import { Component } from 'react';
import Layout from './../components/layout'
import fetch from 'isomorphic-unfetch'
import { APIURL } from "../../config/env";
import { createMarkup, getPostBySlug } from './../utils';
import { connect } from 'react-redux';
import { actionTypes } from './../store';
import _ from "underscore";

class Page extends Component {

	/**
	 * Get initial props.
	 *
	 * @param {object} context Context.
	 *
	 * @return {object}
	 */
	static async getInitialProps( { query, reduxStore } ) {
		const storedPage = getPostBySlug( reduxStore.getState().pages, query.slug );

		if ( _.isEmpty( storedPage ) ) {
			const PageRes = await fetch( `${APIURL}/wp/v2/pages?slug=${query.slug}` );
			const page = await PageRes.json();
			reduxStore.dispatch( { type: actionTypes.UPDATE_PAGES, payload: page[0] } );
			reduxStore.dispatch( { type: actionTypes.UPDATE_PAGE, payload: page[0] } );
		} else {
			reduxStore.dispatch( { type: actionTypes.UPDATE_PAGE, payload: storedPage } );
		}

		// Triggers when directly accessed.
		if ( _.isEmpty( reduxStore.getState().header ) ) {
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
				{ ! _.isEmpty( page ) && (
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

