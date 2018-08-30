import Link from 'next/link'

const Header = ( props ) => (
	<header>
		{ props.header && (
			<div>
				<div>
					<h1>{ props.header.siteTitle }</h1>
					<p>{ props.header.siteDescription }</p>
				</div>
				<nav>
					<ul>
						{ props.header.menu.map( ( item ) => (
							<li key={ item.id }>
								<Link as={ `/p/${item.slug}` } href={ `/post?id=${item.id}` }>
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

export default Header
