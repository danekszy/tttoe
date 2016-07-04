import React from 'react';
import classNames from 'classnames';


const isVisible = (gameState) => (
	gameState === 'won' ||
	gameState === 'tied'
);

const dialogText = (status) => {
	if(status.gameState === 'won')
		return `Player ${status.winner} has won...`
	else if(status.gameState === 'tied')
		return 'It\'s a tie!';
}

const ResultDialog = ({status, reset}) => (
	<div className={
		classNames(
			'result-dialog',
			{
				'result-dialog--visible': isVisible(status.gameState)
			}
		)}
	>
		<h1 className="result-header">
			{dialogText(status)}
		</h1>
		<button
			type="button"
			className="replay-button"
			onClick={reset}
		>
			Play again?
		</button>
	</div>
)

export default ResultDialog;
