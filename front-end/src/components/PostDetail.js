import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import {getComments, closePost, voteComment} from '../actions/posts';
import SinglePost from './SinglePost';
import PostComment from './PostComment';
import '../styles/postDetail.css'

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

	handleCommentVote = (vote, id) => {
		this.props.voteComment({vote, id});
	}

	render() {
		let showModal = this.props.openedPost ? true : false;
		if(!showModal)
			return '';
		
		let post = this.props.posts.find((x) => x.id === this.props.openedPost.id);
		let comments = 'There are no comments.';
		if(this.props.openedPost.comments && this.props.openedPost.comments.length > 0)
			comments = this.props.openedPost.comments.map((x) =>
				<PostComment key={x.id} comment={x}
				             handleVote={(vote, id) => this.handleCommentVote(vote, id)}/>
			);
		
		return (
			<div id="postDetailContainer">
				<Modal show={showModal} onHide={() => this.handleClose()}>
					<Modal.Header closeButton className="post-detail-header">
						<SinglePost post={post} isDetail/>
						Comments:
					</Modal.Header>
					<Modal.Body>
						{comments}
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
		closePost: () => dispatch(closePost()),
		voteComment: (data) => dispatch(voteComment(data))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostDetail);