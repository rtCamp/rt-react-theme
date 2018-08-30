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
		const { id } = context.query;

		console.log( context.query );
		const res = await fetch( `${APIURL}/wp/v2/pages/${id}` );
		const page = await res.json();

		const header = await fetch( APIURL + '/rt/v1/header');
		const headerData = await header.json();

		return {
			page,
			header: headerData
		}
	}

	render() {

		const { header, page } = this.props;

		console.warn( this.props.page );

		return (
			<Layout header={ header } >
				{ page.title && (
					<div>
						<h1>{ page.title.rendered }</h1>
						<div dangerouslySetInnerHTML={ createMarkup( page.content.rendered ) } />
					</div>
				) }
			</Layout>
		);
	}
}

export default Page
