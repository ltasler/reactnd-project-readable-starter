import React, {Component} from 'react';
import TopMenu from './TopMenu';
import Posts from './Posts';
import {Col, Grid, Row} from 'react-bootstrap';

class App extends Component {
	render() {
		return (
			<Grid id="appContainer">
				<Row>
					<TopMenu/>
				</Row>
				<Row>
					<Col sm={3}/>
					<Col sm={6}>
					<Posts/>
					</Col>
					<Col sm={3}/>
				</Row>
			</Grid>
		);
	}
}

export default App;
