import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button, Glyphicon} from 'react-bootstrap';
import {getComments, closePost, voteComment, openNewComment, postNewComment} from '../actions/posts';
import SinglePost from './SinglePost';
import PostComment from './PostComment';
import NewComment from './NewComment';
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

	handleNewComment = () => {
		this.props.handleNewComment(true);
	}

	handleNewCommentPost = (data) => {
		let parentId = this.props.openedPost.id;
		this.props.handleNewCommentPost({parentId, ...data});
	}

	handleCancelNewCommentPost = () => {
		this.props.handleNewComment(false);
	}

	render() {
		let showModal = this.props.openedPost ? true : false;
		if(!showModal)
			return '';

		let commentCount = 0;
		if(this.props.openedPost.comments)
			commentCount = this.props.openedPost.comments.length;
		console.log(commentCount);
		
		let post = this.props.posts.find((x) => x.id === this.props.openedPost.id);
		let comments = 'There are no comments.';
		if(this.props.openedPost.comments && this.props.openedPost.comments.length > 0)
			comments = this.props.openedPost.comments.map((x) =>
				x.id === this.props.openedPost.editComment ?
					<PostComment key={x.id} comment={x}
					             handleVote={(vote, id) => this.handleCommentVote(vote, id)}
					             edit/> :
				<PostComment key={x.id} comment={x}
				             handleVote={(vote, id) => this.handleCommentVote(vote, id)}/>
			);

		let body =
			<Modal.Body>
				<Button className="pull-right"
				        onClick={() => this.handleNewComment()}>
					New <Glyphicon glyph="comment"/>
				</Button>
				<div id="commentContainer" className="comment-container">
					{comments}
				</div>
			</Modal.Body>

		if(this.props.openedPost.openNewComment) {
			body=
				<Modal.Body>
				<NewComment handleNewCommentPost={(data) => this.handleNewCommentPost(data)}
				            handleCancelNewComment={() => this.handleCancelNewCommentPost()}/>
				<div id="commentContainer" className="comment-container">
					{comments}
				</div>
			</Modal.Body>
		}
		
		return (
			<div id="postDetailContainer">
				<Modal show={showModal} onHide={() => this.handleClose()}>
					<Modal.Header closeButton className="post-detail-header">
						<SinglePost post={post} isDetail/>
						{commentCount} comments:
					</Modal.Header>
					{body}
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
		voteComment: (data) => dispatch(voteComment(data)),
		handleNewComment: (data) => dispatch(openNewComment(data)),
		handleNewCommentPost: (data) => dispatch(postNewComment(data))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostDetail);