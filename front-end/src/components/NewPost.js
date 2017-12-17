import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Modal, Button, Form, FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap';

import {openNewPost, postNewPost} from '../actions/posts';
import formGroup from '../helper/formGroup';

class NewPost extends Component {

	handleClose = () => {
		this.props.openNewPost(false);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let username = e.target.formPostUser.value;
		let title = e.target.formPostTitle.value;
		let body = e.target.formPostBody.value;
		let category = e.target.formPostCategory.value;
		this.props.postNewPost({username, title, body, category});
	}

	render() {
		let showModal = this.props.isOpen ? true : false;
		return (
			<Modal show={showModal} onHide={() => this.handleClose()}>
				<Modal.Header closeButton>
					Create a new post
				</Modal.Header>
				<Modal.Body>
					<Form horizontal onSubmit={(e) => this.handleSubmit(e)}>
						{formGroup('formPostUser', 'Username:', 'text', 'Your username')}
						{formGroup('formPostTitle', 'Title:', 'text', 'Post title')}
						{formGroup('formPostBody', 'Body:', 'textarea', 'A post text...')}
						<FormGroup controlId='formPostCategory'>
							<Col sm={2}>
								<ControlLabel>
									Category:
								</ControlLabel>
							</Col>
							<Col sm={10}>
								<FormControl componentClass='select' placeholder='Select a Category'>
									{this.props.categories.map(
										(c) => <option value={c.name} key={c.name}>{c.name}</option>
									)}
								</FormControl>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col smOffset={2} sm={10}>
								<Button type="submit">
									Submit
								</Button>
								<Button onClick={() => this.handleClose()}>
									Cancel
								</Button>
							</Col>
						</FormGroup>
					</Form>
				</Modal.Body>
			</Modal>
		);
	}
}

function mapStateToProps({posts}) {
	return {
		isOpen: posts.openNewPost,
		categories: posts.categories
	};
}

function mapDispatchToProps(dispatch) {
	return {
		openNewPost:(data) => dispatch(openNewPost(data)),
		postNewPost:(data) => dispatch(postNewPost(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewPost);