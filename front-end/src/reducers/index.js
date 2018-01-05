import { combineReducers } from 'redux';
import { posts } from './posts';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
	posts,
	routing: routerReducer
});