import React, {Component} from 'react';
import {ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';
import {sortPosts} from '../actions/posts'
import {POST_BY_DATE_NEW ,POST_BY_DATE_OLD, POST_BY_SCORE_BAD, POST_BY_SCORE_GOOD} from '../constants/postSortConst'
import {connect} from 'react-redux';

class PostsSort extends Component {

	handleSortClick = (sort) => {
		if(this.props.sortPost)
			this.props.sortPost(sort);
		else
			console.log('sortPost prop not found');
	}

	render() {
		return(
			<ButtonToolbar>
				<ButtonGroup>
					<Button onClick={() => this.handleSortClick(POST_BY_DATE_NEW)}> New </Button>
					<Button onClick={() => this.handleSortClick(POST_BY_DATE_OLD)}> Old </Button>
					<Button onClick={() => this.handleSortClick(POST_BY_SCORE_GOOD)}> Best </Button>
					<Button onClick={() => this.handleSortClick(POST_BY_SCORE_BAD)}> Worst </Button>
				</ButtonGroup>
			</ButtonToolbar>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		sortPost: (data) => dispatch(sortPosts(data))
	};
}

export default connect(
	null,
	mapDispatchToProps
)(PostsSort);
