import _ from 'underscore';

export const createMarkup = ( html ) => {
	return {
		__html: html
	};
};

export const convertDate = ( dateGMT ) => {
	const date = new Date( Date.parse( dateGMT ) );

	return date.toDateString();
};

export const getPostBySlug = ( posts, slug ) => {
	let post = {};

	if ( _.isEmpty( posts ) ) {
		return post;
	}

	return posts[ slug ];
};
