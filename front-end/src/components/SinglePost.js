import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Panel, Row, Grid, InputGroup, Glyphicon, Button} from 'react-bootstrap';
import {vote} from '../actions/posts';
import '../styles/singlePost.css';

class SinglePost extends Component {

	static propTypes = {
		showDeleted: PropTypes.bool,//optional, ker ce ne poda je isto kot da je false.. (velja za vse boole)
		post: PropTypes.object.isRequired,
		handleOpenPostDetail: PropTypes.func
	};

	handleVote(up) {
		this.props.vote({up: up, id: this.props.post.id});
	}

	render() {
		let post = this.props.post;
		let showDeleted = this.props.showDeleted;
		let showCommentButton = this.props.handleOpenPostDetail ?
			<Button className="pull-right"
			        onClick={() => this.props.handleOpenPostDetail(this.props.post.id)}>
				<Glyphicon glyph="comment"/>
					&nbsp;{post.commentCount}
			</Button> : "";

		if(post.deleted && !showDeleted)
			return;
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

		let buttonGroup =
			<div id="postButtonWrapper" className="post-buttons">
				<InputGroup>
					<InputGroup.Addon>{post.voteScore}</InputGroup.Addon>
					<Button onClick={() => this.handleVote(true)}><Glyphicon glyph="arrow-up"/></Button>
					<Button onClick={() => this.handleVote(false)}><Glyphicon glyph="arrow-down"/></Button>
					{showCommentButton}
				</InputGroup>
			</div>
		return (
			<Panel key={post.id} header={title}>
				<Grid id="postContentWrapper" fluid>
					<Row>
						{subTitle}
						{post.body}
					</Row>
					<Row>
						{buttonGroup}
					</Row>
				</Grid>
			</Panel>
		);
	}

}

function mapDispatchToProps(dispatch) {
	return {
		vote: (data) => dispatch(vote(data))
	};
}

export default connect(
	null,
	mapDispatchToProps
)(SinglePost);