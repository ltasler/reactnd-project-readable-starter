
import {GET_CATEGORIES, SELECT_CATEGORY, GET_POSTS} from '../actions/posts';

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
		default:
			return state;
	}
}