/**
 * Header component.
 *
 * @package rt-react-theme
 */

import { Component } from 'react';
import Link from 'next/link'

class Header extends Component {

	render() {

		const { header } = this.props;

		return (
			<header>
				{ header && (
					<div>
						<div>
							<h1>{ header.siteTitle }</h1>
							<p>{ header.siteDescription }</p>
						</div>
						<nav>
							<ul>
								<li key='home' >
									<Link href={ '/' }>
										<a>Home</a>
									</Link>
								</li>
								{ header.menu.map( ( item ) => (
									<li key={ item.id }>
										<Link as={ `/p/${item.slug}` } href={ `/page?id=${item.id}` }>
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
