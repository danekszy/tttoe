const compose = (...funcs) => {
	let data;
	funcs.forEach((step) => {
		if(typeof step == 'function') data = step(data);
		else data = step;
	});
	return data;
}

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

export const isCheckboardFull = (isFieldFilled) => (checkboard) => {
	return checkboard.every(isFieldFilled);
}

export const isGameOver = isCheckboardFull(isFieldFilled);

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

export const checkResult = (combinations) => (checkboard) => {
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

export const checkResultWithCombinations = checkResult(getWinningCombinations());

export const calcStepsNeeded =
	(combinations, flipPlayer) => (checkboard, player) => {
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
	};

export const calcStepsNeededWithCombinations =
	calcStepsNeeded(getWinningCombinations(), flipPlayer);

export const getMovesScore = (calcedCombinations) => {
	return calcedCombinations.map((comb) => {
		let score = comb.stepsToLose !== null ?
			//Bump stepsToLose for more defensive approach
			comb.stepsToLose * 1.5 :
			//If can't lose, return worse score...
			//Uses 4 instead of 4.5 so that fear of loss
			//won't block winning move
			4;

		score += comb.stepsToWin !== null ?
			comb.stepsToWin :
			//If can't win, return worst score
			//3 = empty combination
			//4 -> to discourage dead-end moves
			4;

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

export const getPossibleFieldsFromMove =
	(isFieldFilled) => (move, checkboard) => (
		move.combination.filter((field) => (
			!isFieldFilled(checkboard[field])
			)
		)
	)


export const playComputer = (dispatch, getState) => {
	const { checkboard, status } = getState();
	const calcedCombinations = calcStepsNeededWithCombinations(checkboard, status.currentPlayer);
	const randomBestMove = compose(
		calcedCombinations,
		getMovesScore,
		getBestMoves,
		getRandomEl
	);
	const possibleFields = getPossibleFieldsFromMove(isFieldFilled)(randomBestMove, checkboard);
	const fieldToConquer = getRandomEl(possibleFields);
	return fieldToConquer;
}
