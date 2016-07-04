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

	checkHorizontalResult(checkboard) {
		for (let i = 0; i < 3; i++) {
			let row = checkboard.slice(i * 3, i * 3 + 3);
			if(
				row[0] === row[1] &&
				row[0] === row[2] &&
				row[0] !== ''
			)
				return row[0];
		}
		return false;
	},

	checkVerticalResult(checkboard) {
		for (let i = 0; i < 3; i++) {
			let result;

			if(
				checkboard[i] === checkboard[i+3] &&
				checkboard[i] === checkboard[i+6]
			)
				result = checkboard[i];

			if(checkboard[i] == '')
				result = false;

			if(result)
				return result;
		}
		return false;
	},

	checkDiagonalResult(checkboard) {
		if(checkboard[4] == '') return false;

		if((
				checkboard[0] === checkboard[4] &&
				checkboard[0] === checkboard[8]
			) || (
				checkboard[2] === checkboard[4] &&
				checkboard[2] === checkboard[6]
			)
		)
			return checkboard[4];

		return false;
	},

	checkResult(checkboard, helpers) {
		return helpers.checkHorizontalResult(checkboard) ||
		helpers.checkVerticalResult(checkboard) ||
		helpers.checkDiagonalResult(checkboard);
	},

	finishMove(helpers) {
		const {
			isGameOver,
			isFieldFilled,
			flipPlayer,
			shouldComputerPlay,
			playComputer,
			checkResult
		} = helpers;

		return (dispatch, getState) => {
			const state = getState();
			const { players, checkboard, status } = state;

			const winner = checkResult(checkboard, helpers);

			if(winner) {
				dispatch(updateWinner(winner));
				dispatch(updateGameState('won'));
			}
			else if(isGameOver(checkboard, isFieldFilled))
				dispatch(updateGameState('tied'));

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

function switchPlayer(newPlayer) {
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

function conquerImpossible() {
	return {
		type: 'CONQUER_FIELD_IMPOSSIBLE'
	}
};

function conquerPossible(index, player) {
	return {
		type: 'CONQUER_FIELD_POSSIBLE',
		index,
		player
	}
};

function updateWinner(player) {
	return {
		type: 'UPDATE_WINNER',
		player
	}
};

function updateGameState(gameState) {
	return {
		type: 'UPDATE_GAMESTATE',
		gameState
	}
};
