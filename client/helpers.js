const getRandomEl = (arr) => (
	arr[Math.floor(Math.random() * arr.length)]
);

export const flipPlayer = (player) => {
	return player === 'o' ? 'x' : 'o';
}

export const isFieldFilled = (prevValue) => {
	return typeof prevValue !== 'undefined' && prevValue !== '';
}

export const shouldComputerPlay = (nextPlayer, players) => {
	return players[nextPlayer] === 'COMPUTER';
}

export const isGameOver = (checkboard, isFieldFilled) => {
	return checkboard.every(isFieldFilled);
}

export const checkHorizontalResult = (checkboard) => {
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
}

export const checkVerticalResult = (checkboard) => {
	for (let i = 0; i < 3; i++) {
		let result;

		if(
			checkboard[i] === checkboard[i+3] &&
			checkboard[i] === checkboard[i+6]
		)
			result = checkboard[i];

		if(checkboard[i] === '')
			result = false;

		if(result)
			return result;
	}
	return false;
}

export const checkDiagonalResult = (checkboard) => {
	if(checkboard[4] === '') return false;

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
}

export const checkResult = (checkboard) => {
	return checkHorizontalResult(checkboard) ||
	checkVerticalResult(checkboard) ||
	checkDiagonalResult(checkboard);
}

export const getAvailableMoves = (checkboard) => {
	return checkboard.reduce((acc, item, i) => {
		if(!isFieldFilled(item)) return [...acc, i];
		return acc;
	}, []);
}

export const getWinningCombinations = () => {
	const horizontal = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8]
	]
	const vertical = [
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8]
	]
	const diagonal = [
		[0, 4, 8],
		[2, 4, 6]
	]
	return [...horizontal, ...vertical, ...diagonal];
}

export const calcStepsFromWin = (combinations, checkboard, player) => {
	let moves = combinations.map((combination) => {
		let steps = combination.reduce((acc, field) => {
			//That move's already taken
			if(checkboard[field] === flipPlayer(player))
				return 9999;
			if(checkboard[field] === player) acc--;
			return acc;
		}, 3);

		return { combination, steps };
	})
	return moves;
}

export const getBestMoves = (calcedCombinations) => {
	const sortedCombinations = calcedCombinations.sort((a, b) => {
		return a.steps - b.steps;
	})

	return sortedCombinations.filter((comb) => (
		comb.steps <= sortedCombinations[0].steps
	));
}

export const getPossibleFieldsFromMove = (move, checkboard) => {
	return move.combination.filter((field) => (
		!isFieldFilled(checkboard[field])
		)
	);
}


export const playComputer = (dispatch, getState) => {
	const { checkboard, status } = getState();
	const availableMoves = getAvailableMoves(checkboard);
	const winningCombinations = getWinningCombinations();
	const calcedCombinations = calcStepsFromWin(winningCombinations, checkboard, status.currentPlayer);
	const bestMoves = getBestMoves(calcedCombinations);
	const randomBestMove = getRandomEl(bestMoves);
	const possibleFields = getPossibleFieldsFromMove(randomBestMove, checkboard);
	const fieldToConquer = getRandomEl(possibleFields);
	console.log(randomBestMove, fieldToConquer);
	return fieldToConquer;
}