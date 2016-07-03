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
		this.props.conquer(index, this.props.status.currentPlayer);
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

export default Checkboard;
