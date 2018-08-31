import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const initialState = {
	header: {},
	posts: {},
	post: {},
	page: {}
};

export const actionTypes = {
	UPDATE_HEADER: 'UPDATE_HEADER',
	UPDATE_POSTS: 'UPDATE_POSTS',
	UPDATE_POST: 'UPDATE_POST',
	UPDATE_PAGE: 'UPDATE_PAGE'
};

// REDUCERS
export const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.UPDATE_HEADER:
			return Object.assign( {}, state, {
				header: action.payload,
			} );
		case actionTypes.UPDATE_POSTS:
			return Object.assign( {}, state, {
				posts: action.payload,
			} );
		case actionTypes.UPDATE_POST:
			return Object.assign( {}, state, {
				post: action.payload,
			} );
		case actionTypes.UPDATE_PAGE:
			return Object.assign( {}, state, {
				page: action.payload,
			} );
		default:
			return state
	}
};

export function initializeStore( initialState = initialState ) {
	return createStore( reducer, initialState, composeWithDevTools( applyMiddleware( thunkMiddleware ) ) )
}
