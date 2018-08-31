/**
 * Index component.
 *
 * @package rt-react-theme
 */

import { Component } from 'react';
import { connect } from 'react-redux'
import { APIURL } from "./../../config/env";
import Layout from './../components/layout';
import Posts from './../components/posts';
import fetch from 'isomorphic-unfetch';
import { actionTypes } from './../store';
import _ from "underscore";

class Index extends Component {

	/**
	 * Get initial props.
	 *
	 * @return {object} Fetched data.
	 */
	static async getInitialProps( { reduxStore } ) {

		if ( _.isEmpty( reduxStore.getState().header ) ) {
			const header = await fetch( APIURL + '/rt/v1/header' );
			const headerData = await header.json();
			reduxStore.dispatch( { type: actionTypes.UPDATE_HEADER, payload: headerData } );
		}

		if ( _.isEmpty( reduxStore.getState().postList ) ) {
			const post = await fetch( APIURL + '/wp/v2/posts' );
			const postData = await post.json();
			reduxStore.dispatch( { type: actionTypes.UPDATE_POST_LIST, payload: postData } );
		}

		return {};
	}

	/**
	 * Render component.
	 *
	 * @return {*} component.
	 */
	render() {
		const { header, posts } = this.props;

		return (
			<Layout header={ header }>
				<Posts posts={ posts } />
			</Layout>
		);
	}
}

export default connect( ( state ) => {
	return {
		posts: state.postList,
		header: state.header
	}
} )( Index );
