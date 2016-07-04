const helpers = {
	flipPlayer(player) {
		return player === 'o' ? 'x' : 'o';
	},

	isFieldFilled(prevValue) {
		return typeof prevValue !== 'undefined' && prevValue !== '';
	},

	shouldComputerPlay(nextPlayer, players) {
		return players[nextPlayer] === 'COMPUTER';
	},

	isGameOver(checkboard, isFieldFilled) {
		return checkboard.every(isFieldFilled);
	},

	finishMove(helpers) {
		const {
			isGameOver,
			isFieldFilled,
			flipPlayer,
			shouldComputerPlay,
			playComputer
		} = helpers;

		return (dispatch, getState) => {
			const state = getState();
			const { players, checkboard, status } = state;

			if(isGameOver(checkboard, isFieldFilled))
				return console.log('game over');

			const newPlayer = flipPlayer(status.currentPlayer);

			dispatch(switchPlayer(newPlayer));
			if(shouldComputerPlay(newPlayer, players))
				playComputer(dispatch, getState);
		}
	},

	playComputer(dispatch, getState) {
		console.log('computer logic here');
	}
}

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

export function finishMove() {
	return helpers.finishMove(helpers);
};

export function switchPlayer(newPlayer) {
	return {
		type: 'SWITCH_PLAYER',
		newPlayer
	}
};

export function conquer(index, player) {
  return (dispatch, getState) => {
  	const prevValue = getState().checkboard[index];

		if(helpers.isFieldFilled(prevValue))
			dispatch(conquerImpossible());
  	else {
  		dispatch(conquerPossible(index, player));
	  	dispatch(finishMove());
	  }
  }
};

export function conquerImpossible() {
	return {
		type: 'CONQUER_FIELD_IMPOSSIBLE'
	}
};

export function conquerPossible(index, player) {
	return {
		type: 'CONQUER_FIELD_POSSIBLE',
		index,
		player
	}
};
