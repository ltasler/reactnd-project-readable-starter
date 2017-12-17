import React, {Component} from 'react';
import {InputGroup, Button, Glyphicon} from 'react-bootstrap';
import PropTypes from 'prop-types';

class PostButtons extends Component {

	static propTypes = {
		handleVote: PropTypes.func.isRequired,
		voteScore: PropTypes.number,
		handleOpenPostDetail: PropTypes.func,
		commentCount: PropTypes.number,
		handleEditEvent: PropTypes.func,
		handleDeleteEvent: PropTypes.func
	}

	render() {
		let showCommentButton = this.props.handleOpenPostDetail ?
			<Button className="pull-right"
			        onClick={() => this.props.handleOpenPostDetail()}>
				<Glyphicon glyph="comment"/>
				&nbsp;{this.props.commentCount}
			</Button> : "";
			let showEditButton = this.props.handleEditEvent ?
				<Button className="pull-right"
				        onClick={() => this.props.handleEditEvent()}>
					<Glyphicon glyph="edit"/>
				</Button> : '';
				let showDeleteButton = this.props.handleDeleteEvent ?
					<Button className="pull-right"
					        onClick={() => this.props.handleDeleteEvent()}>
						<Glyphicon glyph="remove"/>
					</Button> : '';
			return (
				<div id="postButtonWrapper" className="post-buttons">
					<InputGroup>
						<InputGroup.Addon>{this.props.voteScore ? this.props.voteScore : 0}</InputGroup.Addon>
						<Button onClick={() => this.props.handleVote(true)}><Glyphicon glyph="arrow-up"/></Button>
						<Button onClick={() => this.props.handleVote(false)}><Glyphicon glyph="arrow-down"/></Button>
						{showCommentButton}
						{showEditButton}
						{showDeleteButton}
					</InputGroup>
				</div>
			)
	}
}

export default PostButtons;