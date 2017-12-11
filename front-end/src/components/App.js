import React, {Component} from 'react';
import { Route } from 'react-router';
import TopMenu from './TopMenu';
import Posts from './Posts';

class App extends Component {
	render() {
		return (
			<div>
				<TopMenu/>
				<Posts/>
			</div>
		);
	}
}

export default App;
