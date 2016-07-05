import React from 'react';

const CheckboardItem = ({ index, value, onItemClick }) => {
	return (<td onClick={onItemClick.bind(null, index)}>{value}</td>);
};

const CheckboardRow = ({ row, rowItems, onItemClick }) => (
	<tr>
		{
			rowItems.map((item, ind) => (
				<CheckboardItem
					key={row * 3 + ind}
					index={row * 3 + ind}
					value={item}
					onItemClick={onItemClick}
				/>
			))
		}
	</tr>
);

class Checkboard extends React.Component {
	constructor() {
		super();
	}

	listToGrid(items) {
		return items.reduce((acc, value, i) => {
			if(i%3 === 0) acc.push([value]);
			else acc[acc.length-1].push(value)
			return acc;
		}, [])
	}

	onItemClick(index) {
		const { status, conquer } = this.props;
		conquer(index, status.currentPlayer);
	}

	render() {
		return (
			<table className="checkboard">
				<tbody>
					{
						this.listToGrid(this.props.checkboard)
							.map((items, ind) =>
								<CheckboardRow row={ind} rowItems={items} key={ind} onItemClick={this.onItemClick.bind(this)}/>
							)
					}
				</tbody>
			</table>
		)
	}
}

Checkboard.propTypes = {
	status: React.PropTypes.shape({
		currentPlayer: React.PropTypes.oneOf(['x', 'o']).isRequired
	}).isRequired,
	conquer: React.PropTypes.func.isRequired,
	checkboard: React.PropTypes.arrayOf(React.PropTypes.string)
};

export default Checkboard;
