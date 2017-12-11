import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
import { createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';

//thunks (middleware for async http requests)
import thunk from 'redux-thunk';

//router & history
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createHistory();

const store = createStore(
	reducer,
	composeEnhancer(
		applyMiddleware(thunk, routerMiddleware(history)),
	)
);

ReactDOM.render(
  <Provider store={store}>
	  <ConnectedRouter history={history}>
      <App />
	  </ConnectedRouter>
  </Provider>,
	document.getElementById('root')
);

registerServiceWorker();
