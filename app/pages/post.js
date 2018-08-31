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

class Post extends Component {

	/**
	 * Get initial props.
	 *
	 * @param {object} context Context.
	 *
	 * @return {object}
	 */
	static async getInitialProps( context ) {
		const { slug } = context.query;

		const headerResp = await fetch( APIURL + '/rt/v1/header');
		const header = await headerResp.json();

		const PageRes = await fetch( `${APIURL}/wp/v2/posts/?slug=${slug}` );
		const post = await PageRes.json();

		return {
			post : post[0],
			header
		}
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

export default Post;
