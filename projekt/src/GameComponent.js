import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Konva from 'konva';
import { Stage } from 'react-konva';
import Layer1 from './Layer1Component';
import Layer2 from './Layer2Component';
import Layer3 from './Layer3Component';
import Layer4 from './Layer4Component';
import { test, setHeight, setWidth } from './Redux/reduxActions';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
		test: value => dispatch(test(value)),
		setWidth: value => dispatch(setWidth(value)),
		setHeight: value => dispatch(setHeight(value))
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
		this.props.setWidth(this.state.width);
		this.props.setHeight(this.state.height);
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
