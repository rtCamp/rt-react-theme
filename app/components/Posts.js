/**
 * Posts component.
 *
 * @package rt-react-theme
 */

import { Component } from 'react';
import Link from 'next/link';
import { createMarkup } from './../utils';

class Posts extends Component {

	render() {

		const { posts } = this.props;

		if ( posts ) {
			return posts.map( ( post ) => {
				return (
					<article key={ post.id } >
						<h2>{ post.title.rendered }</h2>
						<div dangerouslySetInnerHTML={ createMarkup( post.excerpt.rendered ) } />
					</article>
				);
			} );
		} else {
			return null;
		}
	}
}

export default Posts
