export function init() {
	return {
		type: 'INIT_GAME'
	}
};

export function reset() {
	return {
		type: 'RESET_GAME'
	}
};

export function switchPlayer(player) {
	return {
		type: 'SWITCH_PLAYER',
		newPlayer: player
	}
};

export function conquer(index, player) {
	return {
		type: 'CONQUER_FIELD',
		index,
		player
	}
};
