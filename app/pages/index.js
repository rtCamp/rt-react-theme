/**
 * Index component.
 *
 * @package rt-react-theme
 */

import { Component } from 'react';
import { APIURL } from "./../../config/env";
import Layout from './../components/Layout';
import Posts from './../components/posts';
import fetch from 'isomorphic-unfetch'

class Index extends Component {

	static async getInitialProps() {
		const header = await fetch( APIURL + '/rt/v1/header');
		const headerData = await header.json();
		const post = await fetch( APIURL + '/wp/v2/posts');
		const postData = await post.json();

		return {
			header: headerData,
			posts: postData
		}
	}

	render() {

		const { header, posts } = this.props;

		return (
			<Layout header={ header }>
				<Posts posts={ posts } />
			</Layout>
		);
	}
}

export default Index;
