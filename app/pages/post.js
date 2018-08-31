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
import { actionTypes } from "../store";
import { connect } from 'react-redux';
import _ from 'underscore';

class Post extends Component {

	/**
	 * Get initial props.
	 *
	 * @param {object} context Context.
	 *
	 * @return {object}
	 */
	static async getInitialProps( { query, reduxStore } ) {

		const storedPost = getPostBySlug( reduxStore.getState().posts, query.slug );

		if ( _.isEmpty( storedPost ) ) {
			const PostRes = await fetch( `${APIURL}/wp/v2/posts/?slug=${query.slug}` );
			const postData = await PostRes.json();
			reduxStore.dispatch( { type: actionTypes.UPDATE_POSTS, payload: postData[0] } );
			reduxStore.dispatch( { type: actionTypes.UPDATE_POST, payload: postData[0] } );
		} else {
			reduxStore.dispatch( { type: actionTypes.UPDATE_POST, payload: storedPost } );
		}

		// Triggers when directly accessed.
		if ( _.isEmpty( reduxStore.getState().header ) ) {
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
				{ ! _.isEmpty( post ) && (
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

