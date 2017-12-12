import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getPosts} from '../actions/posts';
import SinglePost from './SinglePost';
import { withRouter } from 'react-router'
class Posts extends Component {
	componentDidMount() {
		this.props.getPosts(null); //dobimo začetne podatke
	}

	render() {
		let posts = this.props.posts;
		return (
			<div id="postsContainer">
				{posts.map((post) =>
					<SinglePost key={post.id} post={post} showCommentButton/>
				)}
			</div>
		);
	}
}

function mapStateToProps({posts}) {
	return {
		posts: posts.posts
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getPosts: (data) => dispatch(getPosts(data))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Posts);