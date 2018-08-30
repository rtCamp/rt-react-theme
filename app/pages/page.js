/**
 * Page component.
 *
 * @package rt-react-theme
 */

import { Component } from 'react';
import Layout from './../components/Layout'
import fetch from 'isomorphic-unfetch'
import { APIURL } from "../../config/env";
import { createMarkup } from './../utils';

class Page extends Component {

	static async getInitialProps( context ) {
		const { id, type } = context.query;
		const postType = 'post' === type ? 'posts' : 'pages';

		const header = await fetch( APIURL + '/rt/v1/header');
		const headerData = await header.json();

		const res = await fetch( `${APIURL}/wp/v2/${postType}/${id}` );
		const page = await res.json();

		return {
			page,
			header: headerData
		}
	}

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
