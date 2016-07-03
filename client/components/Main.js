import React from 'react';

import Checkboard from './Checkboard';
import ResultDialog from './ResultDialog';

const Main = () => (
	<div className="game-ui">
		<ResultDialog/>
		<Checkboard/>
	</div>
)

export default Main;
