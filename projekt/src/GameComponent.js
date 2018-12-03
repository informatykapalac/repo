import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Konva from 'konva';
import { Stage } from 'react-konva';
import Layer1 from './Layer1Component';
import Layer2 from './Layer2Component';
import Layer3 from './Layer3Component';
import Layer4 from './Layer4Component';
import { test } from './Redux/reduxActions';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    test: value => dispatch(test(value))
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
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight
		});
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
		    <Layer1 width={this.state.width} height={this.state.height}/>
				<Layer2 width={this.state.width} height={this.state.height}/>
				<Layer3 width={this.state.width} height={this.state.height}/>
		<Layer4 width={this.state.width} height={this.state.height}/>
			</Stage>
		);
	}
}

const Game = connect(mapStateToProps, mapDispatchToProps)(_Game);

export default Game;
