export const createMarkup = ( html ) => {
	return {
		__html: html
	};
};

export const convertDate = ( dateGMT ) => {
	const date = new Date( Date.parse( dateGMT ) );

	return date.toDateString();
};
