import React, { Component } from 'react';
import Konva from 'konva';
import { Layer, Stage } from 'react-konva';

class Game extends Component {
	constructor() {
		super();
	}
	render() {
		return(
			<Stage width={window.innerWidth} height={window.innerHeight}>
				<Layer>
				</Layer>
			</Stage>
		);
	}
}

export default Game;
