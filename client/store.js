import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const middewares = [ thunk ];

const defaultState = {
	players: {
		o: 'USER',
		x: 'COMPUTER',
	},
	status: {
		gameState: 'running', //'won'/'tied',
		winner: undefined, //o/x,
		currentPlayer: 'o'
	},
	checkboard: [
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	]
}

const store = createStore(
	rootReducer,
	defaultState,
	applyMiddleware(...middewares)
);

export default store;
