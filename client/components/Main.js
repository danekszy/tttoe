import React from 'react';

import Checkboard from './Checkboard';
import ResultDialog from './ResultDialog';

const Main = (props) => (
	<div className="game-ui">
		<ResultDialog
			status={props.status}
			reset={props.reset}
		/>
		<Checkboard {...props}/>
	</div>
)

export default Main;
