import axios from 'axios';
import uuid from 'uuid';
import {push} from 'react-router-redux';

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const VOTE_POST = 'VOTE_POST';
export const SORT = 'SORT';
export const OPEN_POST = 'OPEN_POST';
export const GET_COMMENTS = 'GET_COMMENTS';
export const CLOSE_POST = 'CLOSE_POST';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const OPEN_NEW_COMMENT = 'OPEN_NEW_COMMENT';
export const POST_NEW_COMMENT = 'POST_NEW_COMMENT';
export const OPEN_EDIT_COMMENT = 'OPEN_EDIT_COMMENT';
export const POST_EDIT_COMMENT = 'POST_EDIT_COMMENT';
export const OPEN_NEW_POST = 'OPEN_NEW_POST';
export const POST_NEW_POST = 'POST_NEW_POST';
export const OPEN_EDIT_POST = 'OPEN_EDIT_POST'
export const POST_EDIT_POST = 'POST_EDIT_POST';

const URL = 'http://127.0.0.1:3001';
const HEADERS = {
	headers: {
		'Authorization': 'whatever-you-want'
	}
};

export function selectCategory({category, path}) {
	return (dispatch) => {
		if(path)
			dispatch(push(`/category/${path}`))
		else
			dispatch(push('/'));
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
					type: VOTE_POST,
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

export function voteComment({id, vote}) {
	let url = `${URL}/comments/${id}`;
	let s =  {
		option: vote ? 'upVote' : 'downVote'
	};
	return (dispatch) => {
		axios.post(url, s, HEADERS)
			.then((response) => {
				dispatch({
					type: VOTE_COMMENT,
					data: response.data
				});
			});
	};
}

export function deletePost(id) {
	let url = `${URL}/posts/${id}`;
	return (dispatch) => {
		axios.delete(url, HEADERS)
			.then((response) => {
			dispatch({
				type: DELETE_POST,
				data: response.data
			});
		});
	};
}

export function deleteComment(id) {
	let url = `${URL}/comments/${id}`;
	return (dispatch) => {
		axios.delete(url, HEADERS)
			.then((response) => {
			dispatch({
				type: DELETE_COMMENT,
				data: response.data
			});
		});
	}
}

export function openNewComment(data) {
	return {
		type: OPEN_NEW_COMMENT,
		open: data
	};
}

export function postNewComment({parentId, username, body}) {
	let url = `${URL}/comments`
	let data = {
		id: uuid(),
		timestamp: new Date(Date()).getTime(),
		body: body,
		author: username,
		parentId: parentId,
	}
	return (dispatch) => {
		axios.post(url, data, HEADERS)
			.then((response) => {
				dispatch({
					type:POST_NEW_COMMENT,
					data: response.data
				});
		});
	};
}

export function openEditComment({id, open}) {
	return {
		type: OPEN_EDIT_COMMENT,
		id: id,
		open: open
	};
}

export function postEditComment({id, body}) {
	let url = `${URL}/comments/${id}`
	let params = {
		body: body,
		timestamp: new Date(Date()).getTime()
	};
	return (dispatch) => {
		axios.put(url, params, HEADERS).then((response) => {
			dispatch({
				type: POST_EDIT_COMMENT,
				data:response.data
			});
		});
	};
}

export function openNewPost(open) {
	return {
		type: OPEN_NEW_POST,
		open: open
	};
}

export function postNewPost({username, title, body, category}) {
	let url = `${URL}/posts`;
	let data = {
		id: uuid(),
		timestamp: new Date(Date()).getTime(),
		title,
		body,
		author: username,
		category
	};
	return (dispatch) => {
		axios.post(url, data, HEADERS).then((response) => {
			dispatch({
				type: POST_NEW_POST,
				data: response.data
			});
		});
	};
}

export function openEditPost({id, open}) {
	return {
		type: OPEN_EDIT_POST,
		id,
		open
	}
}

export function postEditPost({id, title, body}) {
	let url = `${URL}/posts/${id}`
	let data = {
		title,
		body
	};
	return (dispatch) => {
		axios.put(url, data, HEADERS).then((response) => {
			dispatch({
				type: POST_EDIT_POST,
				data: response.data
			});
		});
	};
}