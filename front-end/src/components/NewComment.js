import React, {Component} from 'react';
import {Panel, Form, Col, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap'
import PropTypes from 'prop-types';

class NewComment extends Component {

	static propTypes = {
		handleNewCommentPost: PropTypes.func.isRequired
	};

	formGroup(id, label, type, placeHolder) {
		return (
			<FormGroup controlId={id}>
			<Col componentClass={ControlLabel} sm={2}>
				{label}
			</Col>
			<Col sm={10}>
				{type === 'textarea' ?
				<FormControl componentClass={type}
				             placeholder={placeHolder}
				             style={{maxWidth: '100%'}} />
				: <FormControl type={type} placeholder={placeHolder}/>}
			</Col>
		</FormGroup>
		)
	}

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
					{this.formGroup('formCommentUser', 'Username:', 'text', 'Your username')}
					{this.formGroup('formCommentBody', 'Body:', 'textarea', 'A text body...')}
					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button type="submit">
								Post Comment
							</Button>
						</Col>
					</FormGroup>
				</Form>
			</Panel>
		)
	}
}

export default NewComment;