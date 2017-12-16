import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import {getComments, closePost} from '../actions/posts';
import SinglePost from './SinglePost';

class PostDetail extends Component {

	componentWillReceiveProps(nextProps) {
		if(nextProps.openedPost && (!this.props.openedPost ||
				nextProps.openedPost.id !== this.props.openedPost.id)) {
			this.props.openComments(nextProps.openedPost.id);
		}
	}

	handleClose = () => {
		this.props.closePost();
	}

	render() {
		let showModal = this.props.openedPost ? true : false;
		let post = {};
		if(showModal)
			post = this.props.posts.find((x) => x.id === this.props.openedPost.id);

		console.log(post);
		return (
			<div id="postDetailContainer">
				<Modal show={showModal} onHide={() => this.handleClose()}>
					<Modal.Header closeButton>
						<SinglePost post={post}/>
					</Modal.Header>
					<Modal.Body>
						//TODO: Comments
					</Modal.Body>
				</Modal>
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
		openComments: (data) => dispatch(getComments(data)),
		closePost: () => dispatch(closePost())
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostDetail);