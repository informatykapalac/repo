import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Konva from 'konva';
import { Stage } from 'react-konva';
import Layer1 from './Layer1Component';
import Layer2 from './Layer2Component';
import Layer3 from './Layer3Component';
import Layer4 from './Layer4Component';
import { test, setZoom, setScreenSize, setMapPos } from './Redux/reduxActions';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
		test: value => dispatch(test(value)),
		setScreenSize: (width, height) => dispatch(setScreenSize(width, height)),
		setMapPos: (x, y) => dispatch(setMapPos(x, y)),
		setZoom: value => dispatch(setZoom(value))
  };
};

class _Game extends Component {
	constructor() {
		super();
		this.state = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		this.handleResize = this.handleResize.bind(this);
	}

	handleResize() {
		this.setState({width: window.innerWidth});
		this.setState({height: window.innerHeight});
		const zoomX = this.state.width / 1280;
		const zoomY = this.state.height / 720;
		const avgZoom = (zoomX + zoomY) / 2;
		const mapX = -((2560*avgZoom - this.state.width)/2);
		const mapY = -((1920*avgZoom - this.state.height)/2);
	console.log('x0: ' + mapX + "y0: " + mapY)
		this.props.setScreenSize(this.state.width, this.state.height);
		this.props.setZoom(avgZoom);
		this.props.setMapPos(mapX,mapY)
	}

	loadData() {

    const data = {
      userID: this.props.userID,
      token: this.props.token
    }

    axios.post('/game-data', { data }).then(res => {
      console.log("DONE");
    });

  }

	componentDidMount() {
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}
				// <Layer2> usunięty tymczasowo z powodu wielu błędów zwalniających aplikacje oraz zmniejszających komfort pracy
	render() {
		return(
			<Stage width={this.state.width} height={this.state.height}>
		    <Layer1/>
				<Layer2/>
				<Layer3/>
		    <Layer4/>
			</Stage>
		);
	}
}

const Game = connect(mapStateToProps, mapDispatchToProps)(_Game);

export default Game;
