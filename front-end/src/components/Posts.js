import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getPosts} from '../actions/posts';

class Posts extends Component {
	componentDidMount() {
		this.props.getPosts(null); //dobimo začetne podatke
	}

	render() {
		return (
			<div>
				TODO
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