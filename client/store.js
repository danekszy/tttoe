import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const middewares = [ thunk ];


const store = createStore(
	rootReducer,
	applyMiddleware(...middewares)
);

export default store;
