/**
 * Posts component.
 *
 * @package rt-react-theme
 */

import css from './style.scss';
import { Component } from 'react';
import Link from 'next/link';
import { createMarkup } from './../../utils';

class Posts extends Component {

	render() {

		const { posts } = this.props;

		if ( posts ) {
			return posts.map( ( post ) => {
				return (
					<article className={ css.article } key={ post.id } >
						<h2 className={ css.postTitle } >
							<Link as={ `/${post.slug}` } href={ `/page?id=${post.id}&type=post` }>
								<a>{ post.title.rendered }</a>
							</Link>
						</h2>
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
