function status(state = [], action) {
	switch(action.type) {
		case 'SWITCH_PLAYER':
			return {
				...state,
				currentPlayer: action.newPlayer
			}
			break;

		case 'INIT_GAME':
		case 'RESET_GAME':
			return undefined;
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
				winner: action.winner
			};
			break;

		default:
			return state;
	}
}

export default status;
