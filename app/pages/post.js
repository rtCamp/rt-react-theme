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
import { actionTypes } from "../store";
import { connect } from 'react-redux';

class Post extends Component {

	/**
	 * Get initial props.
	 *
	 * @param {object} context Context.
	 *
	 * @return {object}
	 */
	static async getInitialProps( { query, reduxStore } ) {

		if ( ! reduxStore.getState().post.slug || query.slug !== reduxStore.getState().post.slug ) {
			const PostRes = await fetch( `${APIURL}/wp/v2/posts/?slug=${query.slug}` );
			const postData = await PostRes.json();
			reduxStore.dispatch( { type: actionTypes.UPDATE_POST, payload: postData[0] } );
		}

		// Triggers when directly accessed.
		if ( 0 ===  Object.keys( reduxStore.getState().header ).length ) {
			const header = await fetch( APIURL + '/rt/v1/header');
			const headerData = await header.json();
			reduxStore.dispatch( { type: actionTypes.UPDATE_HEADER, payload: headerData } );
		}

		return {}
	}

	/**
	 * Render component.
	 *
	 * @return {*}
	 */
	render() {

		const { header, post } = this.props;

		return (
			<Layout header={ header } >
				{ post && (
					<div>
						<h1>
							{ post.title.rendered }
						</h1>
						<div dangerouslySetInnerHTML={ createMarkup( post.content.rendered ) } />
					</div>
				) }
			</Layout>
		);

	}
}

export default connect( ( state ) => {
	return {
		header: state.header,
		post: state.post
	}
} )( Post );

