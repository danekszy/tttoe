import { combineReducers } from 'redux';

import status from './status';
import checkboard from './checkboard';

const players = () => ({
	o: 'USER',
	x: 'COMPUTER',
});

const rootReducer = combineReducers({
	players,
	status,
	checkboard
});

export default rootReducer;
