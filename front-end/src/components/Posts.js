import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getPosts} from '../actions/posts';
import {Panel, Row, Grid, InputGroup, Glyphicon, Button, Col} from 'react-bootstrap';
import styles from '../styles/posts.css';

class Posts extends Component {
	componentDidMount() {
		this.props.getPosts(null); //dobimo začetne podatke
	}

	getPostPanel(post) {
		if(post.deleted)
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
					<Button className="pull-right"><Glyphicon glyph="comment"/></Button>
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
		)
	}

	render() {
		let posts = this.props.posts;
		console.log(posts);
		return (
			<div id="postsContainer">
				{posts.map(this.getPostPanel)}
			</div>
		);
	}
}

function mapStateToProps({posts}) {
	return {
		posts: posts.posts
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getPosts: (data) => dispatch(getPosts(data))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Posts);