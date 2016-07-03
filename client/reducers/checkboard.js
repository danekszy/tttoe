function checkboard(state = [], action) {
	switch(action.type) {
		case 'CONQUER_FIELD':
			const i = action.index;
			return [
				...state.slice(0, i),
				action.player,
				...state.slice(i + 1)
			]
			break;

		case 'INIT_GAME':
		case 'RESET_GAME':
			return state;
			break;

		default:
			return state;
	}
}

export default checkboard;
