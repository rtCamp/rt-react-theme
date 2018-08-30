/**
 * Page component.
 *
 * @package rt-react-theme
 */

import { Component } from 'react';
import Layout from './../components/Layout'
import fetch from 'isomorphic-unfetch'
import { APIURL } from "../../config/env";

class Page extends Component {

	constructor() {
		super();

		this.createMarkup = this.createMarkup.bind( this );
	}

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

	createMarkup( html ) {
		return {
			__html: html
		};
	}

	render() {

		const { header, page } = this.props;

		console.warn( this.props.page );

		return (
			<Layout header={ header } >
				{ page.title && (
					<div>
						<h1>{ page.title.rendered }</h1>
						<div dangerouslySetInnerHTML={ this.createMarkup( page.content.rendered ) } />
					</div>
				) }
			</Layout>
		);
	}
}

export default Page
