import * as helpers from '../helpers';

export function reset() {
	return {
		type: 'RESET_GAME'
	}
};

export function finishMove(shouldSwitch = true) {
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
			return dispatch(updateGameState('won'));
		}
		else if(isGameOver(checkboard, isFieldFilled))
			return dispatch(updateGameState('tied'));

		const newPlayer =
			shouldSwitch ?
			flipPlayer(status.currentPlayer) :
			status.currentPlayer;
		dispatch(switchPlayer(newPlayer));

		if(shouldComputerPlay(newPlayer, players)) {
			let field = playComputer(dispatch, getState);
			const conquerAction = (dispatch) => {
				dispatch(conquer(field, newPlayer, true))
			};
			setTimeout(conquerAction.bind(null, dispatch), 500);
		}
	}
};

function switchPlayer(newPlayer) {
	return {
		type: 'SWITCH_PLAYER',
		newPlayer
	}
};

export function conquer(index, player, isComputer = false) {
  return (dispatch, getState) => {
  	const playerType = getState().players[player];
  	const prevValue = getState().checkboard[index];

  	if(!isComputer && playerType !== 'USER')
  		return dispatch(conquerImpossible());

		if(helpers.isFieldFilled(prevValue) || typeof index == 'undefined') {
			dispatch(conquerImpossible());
			dispatch(finishMove(false));
		} else {
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
