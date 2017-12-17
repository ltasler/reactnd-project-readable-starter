import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Panel, Col} from 'react-bootstrap';
import PostButtons from './PostButtons';
import {connect} from 'react-redux';
import {deleteComment} from '../actions/posts';

class PostComment extends Component {

	static propTypes = {
		comment: PropTypes.object.isRequired,
		handleVote: PropTypes.func.isRequired,
		edit: PropTypes.bool,
		showDeleted: PropTypes.bool
	};

	handleVote = (up) => {
		this.props.handleVote(up, this.props.comment.id);
	}

	handleDeleteEvent = () => {
		this.props.handleDeleteEvent(this.props.comment.id);
	}

	render() {
		let comment = this.props.comment;
		if((comment.deleted && !this.props.showDeleted) || !comment)
			return '';
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
		</div>
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
							<p>
								{comment.body}
							</p>
						</Row>
						<Row>
							<PostButtons handleVote={(up) => this.handleVote(up)}
							             voteScore={this.props.comment.voteScore}
							             handleDeleteEvent={() => this.handleDeleteEvent()}/>
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
		handleDeleteEvent: (data) => dispatch(deleteComment(data))
	};
}

export default connect(
	null,
	mapDispatchToProps
)(PostComment);