import React, {Component} from 'react';
import {Panel, Form, Col, FormGroup, Button} from 'react-bootstrap'
import PropTypes from 'prop-types';
import formGroup from '../helper/formGroup';

class NewComment extends Component {

	static propTypes = {
		handleNewCommentPost: PropTypes.func.isRequired,
		handleCancelNewComment: PropTypes.func.isRequired,
	};

	handleSubmit = (e) => {
		e.preventDefault();
		let username = e.target.formCommentUser.value;
		let body = e.target.formCommentBody.value;
		this.props.handleNewCommentPost({username, body});
	}

	render() {
		return (
			<Panel key='newComment' header='New Comment'>
				<Form horizontal onSubmit={(e) => this.handleSubmit(e)}>
					{formGroup('formCommentUser', 'Username:', 'text', 'Your username')}
					{formGroup('formCommentBody', 'Body:', 'textarea', 'A text body...')}
					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button type="submit">
								Post Comment
							</Button>
							<Button onClick={() => this.props.handleCancelNewComment()}>
								Cancel
							</Button>
						</Col>
					</FormGroup>
				</Form>
			</Panel>
		)
	}
}

export default NewComment;