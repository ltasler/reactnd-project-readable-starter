import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Panel, Col, Form, FormGroup, Button} from 'react-bootstrap';
import PostButtons from './PostButtons';
import {connect} from 'react-redux';
import {deleteComment, openEditComment, postEditComment} from '../actions/posts';
import NewComment from './NewComment';
import formGroup from '../helper/formGroup';

class PostComment extends Component {

	static propTypes = {
		comment: PropTypes.object.isRequired,
		handleVote: PropTypes.func.isRequired,
		edit: PropTypes.bool,
		showDeleted: PropTypes.bool
	};

	handleVote = (up) => {
		this.props.handleVote(up, this.props.comment.id);
	};

	handleDeleteEvent = () => {
		this.props.handleDeleteEvent(this.props.comment.id);
	};

	handleOpenEditEvent = (open) => {
		let id = this.props.comment.id;
		this.props.handleOpenEditEvent({id, open});
	};

	handlePostEditEvent = (e) => {
		e.preventDefault();
		let body = e.target.formCommentBody.value;
		let id = this.props.comment.id;
		this.props.handlePostEditEvent({id, body});
	};

	render() {
		let comment = this.props.comment;
		if((comment.deleted && !this.props.showDeleted) || !comment)
			return '';

		let body = comment.body;
		if(this.props.edit) {
			body =
				<Form horizontal onSubmit={(e) => this.handlePostEditEvent(e)}>
					{formGroup('formCommentBody', 'Body:', 'textarea', 'A text body...', body)}
					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button type="submit">
								Edit Comment
							</Button>
							<Button onClick={() => this.props.handleOpenEditEvent(false)}>
								Cancel
							</Button>
						</Col>
					</FormGroup>
				</Form>
		}

		let subTitle =
		<div className="post-subtitle">
			<p>
				-- Submited on&nbsp;
				<span className="subtitle-data">
				{new Date(comment.timestamp).toDateString()}
				</span>
				&nbsp;by&nbsp;
				<span className="subtitle-data">
				{comment.author}
				</span>
			</p>
			<hr/>
		</div>;
		return (
			<div id="commentWraper">
				<Panel key={comment.id}>
					<Grid id="commentContentWrapper" fluid>
						<Col sm={1}/>
						<Col sm={12}>
						<Row>
								{subTitle}
						</Row>
						<Row>
							{body}
						</Row>
						<Row>
							<PostButtons handleVote={(up) => this.handleVote(up)}
							             voteScore={this.props.comment.voteScore}
							             handleDeleteEvent={() => this.handleDeleteEvent()}
							             handleEditEvent={() => this.handleOpenEditEvent(true)}/>
						</Row>
						</Col>
					</Grid>
				</Panel>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		handleDeleteEvent: (data) => dispatch(deleteComment(data)),
		handleOpenEditEvent: (data) => dispatch(openEditComment(data)),
		handlePostEditEvent: (data) => dispatch(postEditComment(data))
	};
}

export default connect(
	null,
	mapDispatchToProps
)(PostComment);