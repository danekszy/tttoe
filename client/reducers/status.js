const defaultState = {
	gameState: 'running', //'won'/'tied',
	winner: undefined, //o/x,
	currentPlayer: 'o'
};

function status(state = defaultState, action) {
	switch(action.type) {
		case 'SWITCH_PLAYER':
			return {
				...state,
				currentPlayer: action.newPlayer
			}
			break;

		case 'INIT_GAME':
		case 'RESET_GAME':
			return defaultState;
			break;

		case 'UPDATE_GAMESTATE':
			return {
				...state,
				gameState: action.gameState
			};
			break;

		case 'UPDATE_WINNER':
			return {
				...state,
				winner: action.player
			};
			break;

		default:
			return state;
	}
}

export default status;
