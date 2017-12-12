import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Panel, Row, Grid, InputGroup, Glyphicon, Button, Col} from 'react-bootstrap';
import styles from '../styles/singlePost.css';

class SinglePost extends Component {

	static propTypes = {
		showDeleted: PropTypes.bool,//optional, ker ce ne poda je isto kot da je false.. (velja za vse boole)
		post: PropTypes.object.isRequired,
		comments: PropTypes.array,
		showCommentButton: PropTypes.bool
	};

	render() {
		let post = this.props.post;
		let showDeleted = this.props.showDeleted;
		let comments = this.props.comments;
		let showCommentButton = this.props.showCommentButton ?
			<Button className="pull-right"><Glyphicon glyph="comment"/></Button> : "";

		if(post.deleted && !showDeleted)
			return;
		let subTitle =
			<div className="postSubtitle">
				<p>
					-- Submited on&nbsp;
					<span className="subtitleData">
				{new Date(post.timestamp).toDateString()}
				</span>
					&nbsp;by&nbsp;
					<span className="subtitleData">
				{post.author}
				</span>
					&nbsp;to category:&nbsp;
					<span className="subtitleData">
					{post.category}
				</span>
					&nbsp;
				</p>
				<hr/>
			</div>
		let title =
			<div id="postTitleWraper">
				{post.title}
			</div>

		let buttonGroup =
			<div id="postButtonWrapper" className="post-buttons">
				<InputGroup>
					<InputGroup.Addon>{post.voteScore}</InputGroup.Addon>
					<Button><Glyphicon glyph="arrow-up"/></Button>
					<Button><Glyphicon glyph="arrow-down"/></Button>
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

export default SinglePost