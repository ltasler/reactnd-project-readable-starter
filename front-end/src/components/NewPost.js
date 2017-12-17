import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Modal, Button, Form, FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap';

import {openNewPost, postNewPost, openEditPost, postEditPost} from '../actions/posts';
import formGroup from '../helper/formGroup';

class NewPost extends Component {

	handleClose = () => {
		if(this.props.isOpen)
			this.props.openNewPost(false);
		else {
			this.props.openEditPost({id: undefined, open: false});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let username = e.target.formPostUser.value;
		let title = e.target.formPostTitle.value;
		let body = e.target.formPostBody.value;
		let category = e.target.formPostCategory.value;
		if(this.props.isOpen)
			this.props.postNewPost({username, title, body, category});
		else if(this.props.openEditPostId) {
			let id = this.props.openEditPostId;
			this.props.postEditPost({id, title, body})
		}
	}

	render() {
		let post = this.props.posts.find((p) => this.props.openEditPostId === p.id);
		let showModal = this.props.isOpen || this.props.openEditPostId ? true : false;
		return (
			<Modal show={showModal} onHide={() => this.handleClose()}>
				<Modal.Header closeButton>
					Create a new post
				</Modal.Header>
				<Modal.Body>
					<Form horizontal onSubmit={(e) => this.handleSubmit(e)}>
						{formGroup('formPostUser', 'Username:', 'text', 'Your username', post ? post.author : '', post ? true : false)}
						{formGroup('formPostTitle', 'Title:', 'text', 'Post title', post ? post.title : '')}
						{formGroup('formPostBody', 'Body:', 'textarea', 'A post text...', post ? post.body : '')}
						<FormGroup controlId='formPostCategory'>
							<Col sm={2}>
								<ControlLabel>
									Category:
								</ControlLabel>
							</Col>
							<Col sm={10}>
								<FormControl componentClass='select'
								             placeholder='Select a Category'
								             defaultValue={post ? post.category : ''}
								             disabled={post ? true : false}>
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
		categories: posts.categories,
		openEditPostId: posts.editPostId,
		posts: posts.posts
	};
}

function mapDispatchToProps(dispatch) {
	return {
		openNewPost:(data) => dispatch(openNewPost(data)),
		postNewPost:(data) => dispatch(postNewPost(data)),
		openEditPost:(data) => dispatch(openEditPost(data)),
		postEditPost:(data) => dispatch(postEditPost(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewPost);