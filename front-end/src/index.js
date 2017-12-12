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

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	composeEnhancer(
		applyMiddleware(thunk),
	)
);

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
	document.getElementById('root')
);

registerServiceWorker();
