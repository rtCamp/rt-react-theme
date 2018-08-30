/**
 * Header component.
 *
 * @package rt-react-theme
 */

import css from './style.scss';
import { Component } from 'react';
import Link from 'next/link'

class Header extends Component {

	render() {

		const { header } = this.props;

		return (
			<header className={ css.siteHeader } >
				{ header && (
					<div>
						<div className={ css.siteTitleDesc } >
							<h1 className={ css.siteTitle } >{ header.siteTitle }</h1>
							<p>{ header.siteDescription }</p>
						</div>
						<nav className={ css.mainNavContainer } >
							<ul className={ css.mainNavList } >
								<li key='home' >
									<Link href={ '/' }>
										<a>Home</a>
									</Link>
								</li>
								{ header.menu.map( ( item ) => (
									<li key={ item.id }>
										<Link as={ `/${item.slug}` } href={ `/page?id=${item.id}&type=page` }>
											<a>{ item.title }</a>
										</Link>
									</li>
								) ) }
							</ul>
						</nav>
					</div>
				) }
			</header>
		);
	}
}

export default Header
