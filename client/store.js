import { createStore, compose } from 'redux';

import rootReducer from './reducers/index';

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

const store = createStore(rootReducer, defaultState);

export default store;
