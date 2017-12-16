import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getPosts, openPost} from '../actions/posts';
import SinglePost from './SinglePost';
import PostsSort from './PostsSort';
import PostDetail from './PostDetail';

class Posts extends Component {

	componentDidMount() {
 		this.props.getPosts(null); //dobimo začetne podatke
	}

	handleOpenPostDetail = (id) => {
		this.props.openPost(id);
	}

	render() {
		let posts = this.props.posts;
		return (
			<div id="postsContainer">
				<PostsSort/>
				{posts.map((post) =>
					<SinglePost key={post.id} post={post}
					            handleOpenPostDetail={(id) => this.handleOpenPostDetail(id)}/>
				)}
				<PostDetail/>
			</div>
		);
	}
}

function mapStateToProps({posts}) {
	return {
		posts: posts.posts,
		openedPost: posts.openedPost
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getPosts: (data) => dispatch(getPosts(data)),
		openPost: (data) => dispatch(openPost(data))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Posts);