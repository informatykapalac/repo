import React, { Component } from 'react';
import Konva from 'konva';
import { Layer, Stage } from 'react-konva';
import Layer1 from './Layer1Component';

class Game extends Component {
	constructor() {
		super();
		this.state = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		this.handleResize = this.handleResize.bind(this);
	}

	handleResize() {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}

	componentDidMount() {
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	render() {
		return(
			<Stage width={this.state.width} height={this.state.height}>
				<Layer1 />
			</Stage>
		);
	}
}

export default Game;
