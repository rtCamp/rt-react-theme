import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk';
import _ from 'underscore';

const initialState = {
	header: {},
	postList: {},
	posts: {},
	pages: {},
	page: {},
	post: {}
};

export const actionTypes = {
	UPDATE_HEADER: 'UPDATE_HEADER',
	UPDATE_POSTS: 'UPDATE_POSTS',
	UPDATE_PAGES: 'UPDATE_PAGES',
	UPDATE_POST: 'UPDATE_POST',
	UPDATE_PAGE: 'UPDATE_PAGE',
	UPDATE_POST_LIST: 'UPDATE_POST_LIST'
};

// REDUCERS
export const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.UPDATE_HEADER:
			return Object.assign( {}, state, {
				header: action.payload,
			} );
		case actionTypes.UPDATE_POST_LIST:
			return Object.assign( {}, state, {
				postList: action.payload,
			} );
		case actionTypes.UPDATE_POST:
			return Object.assign( {}, state, {
				post: action.payload,
			} );
		case actionTypes.UPDATE_PAGE:
			return Object.assign( {}, state, {
				page: action.payload,
			} );
		case actionTypes.UPDATE_POSTS:
			const post = action.payload;

			if ( ! _.isEmpty( post ) && post.slug ) {
				state.posts[ post.slug ] = post;
			}
			return state;
		case actionTypes.UPDATE_PAGES:
			const page = action.payload;

			if ( ! _.isEmpty( page ) && page.slug ) {
				state.pages[ page.slug ] = page;
			}
			return state;
		default:
			return state
	}
};

export function initializeStore( initialState = initialState ) {
	return createStore( reducer, initialState, composeWithDevTools( applyMiddleware( thunkMiddleware ) ) )
}
