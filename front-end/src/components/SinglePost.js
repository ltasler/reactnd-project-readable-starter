import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Panel, Row, Grid} from 'react-bootstrap';
import {vote, deletePost, openEditPost} from '../actions/posts';
import '../styles/singlePost.css';
import PostButtons from './PostButtons';

class SinglePost extends Component {

	static propTypes = {
		showDeleted: PropTypes.bool,//optional, ker ce ne poda je isto kot da je false.. (velja za vse boole)
		isDetail: PropTypes.bool,
		post: PropTypes.object.isRequired,
		handleOpenPostDetail: PropTypes.func,
	};

	handleVote = (up) => {
		this.props.vote({up: up, id: this.props.post.id});
	}

	handleDeleteEvent = () => {
		this.props.handleDeleteEvent(this.props.post.id);
	}

	handleEditEvent = () => {
		let id = this.props.post.id;
		let open = true;
		this.props.openEditPost({id, open});
	}

	render() {
		let post = this.props.post;
		let showDeleted = this.props.showDeleted;
		if((post.deleted && !showDeleted) || !post)
			return '';
		let postButtons =
			<PostButtons handleVote={(up) => this.handleVote(up)}
			             voteScore={this.props.post.voteScore}
			             handleOpenPostDetail={() => this.props.handleOpenPostDetail(this.props.post.id)}
			             commentCount={this.props.post.commentCount}
			             handleDeleteEvent={() => this.handleDeleteEvent()}
			             handleEditEvent={() => this.handleEditEvent()}/>

		let subTitle =
			<div className="post-subtitle">
				<p>
					-- Submited on&nbsp;
					<span className="subtitle-data">
				{new Date(post.timestamp).toDateString()}
				</span>
					&nbsp;by&nbsp;
					<span className="subtitle-data">
				{post.author}
				</span>
					&nbsp;to category:&nbsp;
					<span className="subtitle-data">
					{post.category}
				</span>
					&nbsp;
				</p>
				<hr/>
			</div>
		let title = this.props.handleOpenPostDetail ?
			<div id="postTitleWraper" className="post-header"
					onClick={() => this.props.handleOpenPostDetail(this.props.post.id)}>
				{post.title}
			</div> : <div id="postTitleWraper">
				{post.title}
			</div>
		return (
			<Panel key={post.id} header={title}>
				<Grid id="postContentWrapper" fluid>
					<Row>
						{subTitle}
						{post.body}
					</Row>
					<Row>
						{postButtons}
					</Row>
				</Grid>
			</Panel>
		);
	}

}

function mapDispatchToProps(dispatch) {
	return {
		vote: (data) => dispatch(vote(data)),
		handleDeleteEvent: (data) => dispatch(deletePost(data)),
		openEditPost: (data) => dispatch(openEditPost(data))
	};
}

export default connect(
	null,
	mapDispatchToProps
)(SinglePost);