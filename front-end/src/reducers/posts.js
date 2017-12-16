import {
	GET_CATEGORIES, SELECT_CATEGORY, GET_POSTS, VOTE, SORT, OPEN_POST, GET_COMMENTS,
	CLOSE_POST
} from '../actions/posts';
import sortPosts from '../helper/sortPosts';
import {POST_BY_DATE_NEW} from '../constants/postSortConst'

const initialselectedState = {
	posts: [],
	selectedCategory: null,
	categories: [],
	sortOrder: POST_BY_DATE_NEW,
	openedPost: undefined
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
			};
		case SORT:
			return {
				...state,
				posts: state.posts.concat().sort(
					(a,b) => sortPosts(a,b, action.sort)
				),
				sortOrder: action.sort
			};
		case OPEN_POST:
			return {
				...state,
				openedPost: {
					id: action.postId
				}
			};
		case GET_COMMENTS:
			return {
				...state,
				openedPost: {
					...state.openedPost,
					comments: action.data
				}
			};
		case CLOSE_POST:
			return {
				...state,
				openedPost: undefined
			}
		default:
			return state;
	}
}

