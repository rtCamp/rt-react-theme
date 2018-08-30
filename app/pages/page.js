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

class Page extends Component {

	/**
	 * Get initial props.
	 *
	 * @param {object} context Context.
	 *
	 * @return {object}
	 */
	static async getInitialProps( context ) {
		const { id, type } = context.query;
		const postType = 'post' === type ? 'posts' : 'pages';

		const headerResp = await fetch( APIURL + '/rt/v1/header');
		const header = await headerResp.json();

		const PageRes = await fetch( `${APIURL}/wp/v2/${postType}/${id}` );
		const page = await PageRes.json();

		return {
			page,
			header
		}
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
				{ page.title && (
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

export default Page
