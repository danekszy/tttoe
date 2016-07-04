import * as helpers from '../helpers';

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

		const newPlayer = flipPlayer(status.currentPlayer);
		dispatch(switchPlayer(newPlayer));

		if(shouldComputerPlay(newPlayer, players))
			playComputer(dispatch, getState);
	}
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
