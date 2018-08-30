/**
 * index component.
 *
 * @package rt-react-theme
 */

import { Component } from 'react';
import css from "../static/sass/style.scss"
import Layout from './../components/Layout';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

class Index extends Component {

	constructor() {
		super();

		this.createMarkup = this.createMarkup.bind( this );
	}

	static async getInitialProps() {
		const header = await fetch('https://wordpress.test/wp-json/rt/v1/header');
		const headerData = await header.json();
		const post = await fetch('https://wordpress.test/wp-json/wp/v2/posts');
		const postData = await post.json();

		return {
			header: headerData,
			posts: postData
		}
	}

	createMarkup( html ) {
		return {
			__html: html
		};
	}

	render() {

		const { header, posts } = this.props;

		return (
			<Layout header={ header }>
				{ posts && posts.map( ( post ) => {
					return (
						<article key={ post.id } >
							<h2>{ post.title.rendered }</h2>
							<div dangerouslySetInnerHTML={ this.createMarkup( post.content.rendered ) } />
						</article>
					);
				} ) }
			</Layout>
		);
	}
}

export default Index;
