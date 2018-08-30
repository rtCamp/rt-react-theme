import css from "../static/sass/style.scss"
import Layout from './../components/Layout';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
	<Layout header={props.header} >
		{/*<ul className={css.listStyle} >*/}
			{/*{props.shows.map(({show}) => (*/}
				{/*<li key={show.id}>*/}
					{/*<Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>*/}
						{/*<a>{show.name}</a>*/}
					{/*</Link>*/}
				{/*</li>*/}
			{/*))}*/}
		{/*</ul>*/}
	</Layout>
);

Index.getInitialProps = async function() {
	const header = await fetch('https://wordpress.test/wp-json/rt/v1/header');
	const headerData = await header.json();

	return {
		header: headerData
	}
};

export default Index
