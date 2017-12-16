import {GET_CATEGORIES, SELECT_CATEGORY, GET_POSTS, VOTE, SORT} from '../actions/posts';
import sortPosts from '../helper/sortPosts';
import {POST_BY_DATE_NEW} from '../constants/postSortConst'

const initialselectedState = {
	posts: [],
	selectedCategory: null,
	categories: [],
	sortOrder: POST_BY_DATE_NEW
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
				posts: action.posts.sort(
					(a,b) => sortPosts(a,b, state.sortOrder)
				)
			};
		case VOTE:
			return {
				...state,
				posts: state.posts.map(
					(p) => p.id === action.data.id ? action.data : p
				)
			}
		case SORT:
			return {
				...state,
				posts: state.posts.concat().sort(
					(a,b) => sortPosts(a,b, action.sort)
				),
				sortOrder: action.sort
			}
		default:
			return state;
	}
}

