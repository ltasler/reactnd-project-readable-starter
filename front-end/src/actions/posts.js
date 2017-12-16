import axios from 'axios';

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const VOTE = 'VOTE';
export const SORT = 'SORT';
export const OPEN_POST = 'OPEN_POST';
export const GET_COMMENTS = 'GET_COMMENTS';
export const CLOSE_POST = 'CLOSE_POST';

const URL = 'http://127.0.0.1:3001';
const HEADERS = {
	headers: {
		'Authorization': 'whatever-you-want'
	}
};

export function selectCategory({category, path}) {
	return (dispatch) => {
		dispatch({
			type: SELECT_CATEGORY,
			selectCategory: category
		});
	}
}

export function getCategories() {
	return (dispatch) => {
		axios.get(URL + '/categories', HEADERS)
			.then((response) => {
				dispatch({type: GET_CATEGORIES, categories: response.data.categories});
			});
	};
}

export function getPosts(category) {
	let url = URL;
	category ? url = `${url}/${category}/posts` : url = `${url}/posts`;
	return (dispatch) => {
		axios.get(url, HEADERS)
			.then((response) => {
				dispatch({
					type: GET_POSTS,
					posts: response.data
				});
		});
	}
}

export function vote({up, id}) {
	let url = `${URL}/posts/${id}`;
	let s =  {
		option: up ? 'upVote' : 'downVote'
	};
	return (dispatch) => {
		axios.post(url, s, HEADERS)
			.then((response) => {
				dispatch({
					type: VOTE,
					data: response.data
				});
			});
	};
}

export function sortPosts(sort) {
	return {
		type: SORT,
		sort: sort
	};
}

export function openPost(id) {
	return {
		type: OPEN_POST,
		postId: id
	};
}

export function getComments(postId) {
	let url = `${URL}/posts/${postId}/comments`;
	return (dispatch) => {
		axios.get(url, HEADERS)
			.then((response) => {
				dispatch({
					type: GET_COMMENTS,
					data: response.data
				});
			});
	};
}

export function closePost() {
	return {
		type: CLOSE_POST
	};
}