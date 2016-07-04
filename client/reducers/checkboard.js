const defaultState = Array.apply('', Array(9));

function checkboard(state = defaultState, action) {
	console.log(action);
	switch(action.type) {
		case 'CONQUER_FIELD_POSSIBLE':
			const i = action.index;
			return [
				...state.slice(0, i),
				action.player,
				...state.slice(i + 1)
			]
			break;

		case 'INIT_GAME':
		case 'RESET_GAME':
			return defaultState;
			break;

		default:
			return state;
	}
}

export default checkboard;
