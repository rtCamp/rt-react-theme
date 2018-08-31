/**
 * Posts component.
 *
 * @package rt-react-theme
 */

import css from './style.scss';
import { Component } from 'react';
import Link from 'next/link';
import { createMarkup, convertDate } from './../../utils';

class Posts extends Component {

	render() {

		const { posts } = this.props;

		if ( posts && posts.length ) {
			return posts.map( ( post ) => {
				return (
					<article className={ css.article } key={ post.id } >
						<h2 className={ css.postTitle } >
							<Link as={ `/article/${post.slug}` } href={ `/post?slug=${post.slug}` }>
								<a>{ post.title.rendered }</a>
							</Link>
						</h2>
						<time className={ css.publishedOn } >Published On: { convertDate( post.date ) }</time>
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
