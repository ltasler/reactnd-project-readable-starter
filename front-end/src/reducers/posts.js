import {
	GET_CATEGORIES, SELECT_CATEGORY, GET_POSTS, VOTE_POST, SORT, OPEN_POST, GET_COMMENTS,
	CLOSE_POST, VOTE_COMMENT, DELETE_POST, DELETE_COMMENT, OPEN_NEW_COMMENT, POST_NEW_COMMENT, OPEN_EDIT_COMMENT,
	POST_EDIT_COMMENT, OPEN_NEW_POST, POST_NEW_POST, OPEN_EDIT_POST, POST_EDIT_POST
} from '../actions/posts';
import sortPosts from '../helper/sortPosts';
import {POST_BY_DATE_NEW} from '../constants/postSortConst'

const initialselectedState = {
	posts: [],
	selectedCategory: null,
	categories: [],
	sortOrder: POST_BY_DATE_NEW,
	openedPost: undefined,
	openNewPost: undefined,
	editPostId: undefined
};

export function posts(state = initialselectedState, action) {
	console.log(state);
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
		case VOTE_POST:
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
			};
		case VOTE_COMMENT:
			return {
				...state,
				openedPost: {
					...state.openedPost,
					comments: state.openedPost.comments.map(
						(c) => c.id === action.data.id ? action.data : c
					)
				}
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.map(
					(p) => p.id === action.data.id ? action.data : p
				),
				openedPost: undefined
			};
		case DELETE_COMMENT:
			return {
				...state,
				posts: state.posts.map(
					(p) => {
						if(p.id === action.data.parentId) {
							p.commentCount--;
						}
						return p;
					}
				),
				openedPost: {
					...state.openedPost,
					comments: state.openedPost.comments.map(
						(c) => c.id === action.data.id ? action.data : c
					)
				}
			};
		case OPEN_NEW_COMMENT:
			return {
				...state,
				openedPost: {
					...state.openedPost,
					openNewComment: action.open
				}
			};
		case POST_NEW_COMMENT:
			return {
				...state,
				posts: state.posts.map(
					(p) => {
						if(p.id === action.data.parentId)
							p.commentCount++;
						return p;
					}
				),
				openedPost: {
					...state.openedPost,
					comments: [
						...state.openedPost.comments,
						action.data
					],
					openNewComment: false
				}
			};
		case OPEN_EDIT_COMMENT:
			return {
				...state,
				openedPost: {
					...state.openedPost,
					editComment: action.open ? action.id : undefined
				}
			}
		case POST_EDIT_COMMENT:
			return {
				...state,
				openedPost: {
					...state.openedPost,
					comments: state.openedPost.comments.map(
						(c) => c.id === action.data.id ? action.data : c
					),
					editComment: undefined
				}
			};
		case OPEN_NEW_POST:
			return {
				...state,
				openNewPost: action.open
			};
		case POST_NEW_POST:
			let posts = [
				...state.posts,
				action.data
			];
			return {
				...state,
				posts: posts.sort(
					(a,b) => sortPosts(a,b, state.sortOrder)
				),
				openNewPost: false
				};
		case OPEN_EDIT_POST:
			let editPostId = action.open ? action.id : undefined
			return {
				...state,
				editPostId
			};
		case POST_EDIT_POST:
			let posts2 = state.posts.map(
				(p) => action.data.id === p.id ? action.data : p
			);
			return {
				...state,
				posts: posts2.sort(
					(a,b) => sortPosts(a,b, state.sortOrder)
				),
				editPostId: undefined
			};
		default:
			return state;
	}
}

