import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getCategories, selectCategory, getPosts, openNewPost} from '../actions/posts';
import {Nav, NavItem, Navbar} from 'react-bootstrap';
import '../styles/topMenu.css'

class TopMenu extends Component {
	componentDidMount() {
		this.props.getCategories()
	}

	handlecategorySelect(name, path) {
		this.props.selectCategory({category: name, path});
		this.props.getPosts(name); //refresh da posts
	}

	handleOpenNewPost = () => {
		this.props.openNewPost(true);
	}

	render() {
		const categories = this.props.categories;
		return (
			<Navbar inverse collapseOnSelect fixedTop role="navigation">
				<Navbar.Header >
					<Navbar.Brand onClick={() => this.handlecategorySelect(null, "")}>
						Readable!
					</Navbar.Brand>
					<Navbar.Toggle/>
			</Navbar.Header>
				<Navbar.Collapse>
					<Nav >
						{categories.map((c) =>
							<NavItem key={c.name} onClick={
								() => {
									this.handlecategorySelect(c.name, c.path);
								}
							}>
								{c.name}
							</NavItem>
						)};
					</Nav>
					<Nav pullRight>
						<NavItem onClick={() => this.handleOpenNewPost()}>
							Create New Post
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

function mapStateToProps({posts}) {
	return {
		selectedCategory: posts.selectedCategory,
		categories: posts.categories
	};
}

function mapDispatchToProps(dispatch) {
	return {
		selectCategory: (data) => dispatch(selectCategory(data)),
		getCategories: () => dispatch(getCategories()),
		getPosts: (data) => dispatch(getPosts(data)),
		openNewPost: (data) => dispatch(openNewPost(data))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TopMenu);