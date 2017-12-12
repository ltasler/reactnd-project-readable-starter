import {GET_CATEGORIES, SELECT_CATEGORY, GET_POSTS, VOTE} from '../actions/posts';
import {LOCATION_CHANGE} from 'react-router-redux';

const initialselectedState = {
	posts: [],
	selectedCategory: null,
	categories: []
};

export function posts(state = initialselectedState, action) {
	switch(action.type) {
		case SELECT_CATEGORY:
			return {
				...state,
				selectedCategory: action.selectCategory
			};
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.categories
			};
		case GET_POSTS:
			return {
				...state,
				posts: action.posts
			};
		case VOTE:
			return {
				...state,
				posts: state.posts.map(
					(p) => p.id === action.data.id ? action.data : p
				)
			}
		default:
			return state;
	}
}