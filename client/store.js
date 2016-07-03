import { createStore, compose } from 'redux';

import rootReducer from './reducers/index';

const defaultState = {
	players: {
		o: 'USER',
		x: 'COMPUTER',
	},
	status: {
		state: 'running', //'won'/'tied',
		winner: undefined, //o/x,
		currentPlayer: undefined
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
