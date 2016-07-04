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
			if(checkboard[field] === player) acc--;
			return acc;
		}, 3);

		return { combination, steps };
	})
	return moves;
}

// export const getNeighbours = (field) => {
// 	let neighbours = [];
// 	//right neighbour
// 	if(move % 3 !== 0) neighbours.push(move + 1)
// 	//left neighbour
// 	if(move % 3 !== 2) neighbours.push(move - 1)
// 	//top neighbour
// 	if(move - 3 >= 0) neighbours.push(move - 3)
// 	//bottom neighbour
// 	if(move + 3 < 9) neighbours.push(move + 3)
// 	return neighbours;
// }

// export const getOwnNeighbours = (move, checkboard, player) => {
// 	const neighbours = getNeighbours(move);
// 	return neighbours.reduce((acc, neighbour) => {
// 		if(acc === true) return true;
// 		if(checkboard[neighbour] === player) return true;
// 	}, false)
// 	return false;
// }

// export const scoreMoves = (availableMoves, checkboard, player) => {
// 	return availableMoves.map((move) => {
// 		if(getOwnNeighbours(move, checkboard, player)) console.log(move);
// 	});
// }

export const playComputer = (dispatch, getState) => {
	const { checkboard, status } = getState();
	const availableMoves = getAvailableMoves(checkboard);
	const winningCombinations = getWinningCombinations();
	console.log(calcStepsFromWin(winningCombinations, checkboard, status.currentPlayer))
	// const scoredMoves = scoreMoves(
	// 	availableMoves, checkboard, status.currentPlayer
	// );
	//console.log(scoredMoves)
}
