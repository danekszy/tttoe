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

export const checkResult = (checkboard) => {
	const combinations = getWinningCombinations();

	const isValue = (value) => (field) => (
		checkboard[field] === value
	);

	const isX = isValue('x');
	const isO = isValue('o');

	return combinations.reduce((acc, comb) => {
		if(acc) return acc;
		if(comb.every((isX))) return 'x';
		if(comb.every((isO))) return 'o';
	}, false);
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

export const calcStepsNeeded = (combinations, checkboard, player) => {
	const calcSteps = (player) => (combination) => {
		return combination.reduce((acc, field) => {
			if(acc === null)
				return acc;
			if(checkboard[field] === flipPlayer(player))
				return null;
			if(checkboard[field] === player)
				acc--;
			return acc;
		}, 3);
	};
	const stepsToWin = calcSteps(player);
	const stepsToLose = calcSteps(flipPlayer(player));

	return combinations.map((combination) => ({
	 combination,
	 stepsToWin: stepsToWin(combination),
	 stepsToLose: stepsToLose(combination)
	}));
}

export const getMovesScore = (calcedCombinations) => {
	return calcedCombinations.map((comb) => {
		let score = comb.stepsToLose !== null ?
			//Double stepsToLose for more defensive approach
			comb.stepsToLose * 2 :
			//If can't lose, return higher score
			6;
		score+=comb.stepsToWin;

		return {
			...comb,
			score
		};
	})
}

export const getBestMoves = (scoredMoves) => {
	const sortedMoves = scoredMoves.sort((a, b) => (
		a.score - b.score
	));

	return sortedMoves.filter((comb) => (
		comb.score <= sortedMoves[0].score
	));
}

export const getPossibleFieldsFromMove = (move, checkboard) => (
	move.combination.filter((field) => (
		!isFieldFilled(checkboard[field])
		)
	)
)


export const playComputer = (dispatch, getState) => {
	const { checkboard, status } = getState();
	const winningCombinations = getWinningCombinations();
	const calcedCombinations = calcStepsNeeded(winningCombinations, checkboard, status.currentPlayer);
	const scoredMoves = getMovesScore(calcedCombinations);
	const bestMoves = getBestMoves(scoredMoves);
	const randomBestMove = getRandomEl(bestMoves);
	const possibleFields = getPossibleFieldsFromMove(randomBestMove, checkboard);
	const fieldToConquer = getRandomEl(possibleFields);
	console.log(randomBestMove, possibleFields, fieldToConquer);
	return fieldToConquer;
}
