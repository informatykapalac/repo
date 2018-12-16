import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Konva from 'konva';
import { Stage } from 'react-konva';
import Layer1 from './Layer1Component';
import Layer2 from './Layer2Component';
import Layer3 from './Layer3Component';
import Layer4 from './Layer4Component';
import { saveItems, setZoom, setScreenSize, setMapPos, setPlayerPos } from './Redux/reduxActions';

const mapStateToProps = state => {
  return {
    userID: state.userID,
		token: state.token,
		mapPos: state.mapPos
	};
};

const mapDispatchToProps = dispatch => {
  return {
		saveItems: (lvl, lp, dp, credits, mana, items, questsw, questso, x, y, map) => dispatch(saveItems(lvl, lp, dp, credits, mana, items, questsw, questso, x, y, map)),
		setScreenSize: (width, height) => dispatch(setScreenSize(width, height)),
		setMapPos: (x, y) => dispatch(setMapPos(x, y)),
		setPlayerPos: (x,y) => dispatch(setPlayerPos(x,y)),
		setZoom: value => dispatch(setZoom(value))
  };
};

class _Game extends Component {
	constructor() {
		super();
		this.state = {
			width: window.innerWidth,
			height: window.innerHeight,
			lvl: 1,
			lp: 1,
			dp: 1,
			credits: 1,
			mana: 1,
			items: {},
			questsw: {},
			questso: {},
			x: 0,
			y: 0,
			map: 1
		};

		this.handleResize = this.handleResize.bind(this);
		this.movePlayer = this.movePlayer.bind(this);
	}

	handleResize() {
		this.setState({width: window.innerWidth});
		this.setState({height: window.innerHeight});
		const zoomX = this.state.width / 1280;
		const zoomY = this.state.height / 720;
		const avgZoom = (zoomX + zoomY) / 2;
		const mapX = -((2560*zoomX - this.state.width)/2);
		const mapY = -((1920*zoomY - this.state.height)/2);
		console.log('x0:' + mapX + "y0" + mapY)
		this.props.setScreenSize(this.state.width, this.state.height);
		this.props.setZoom(avgZoom);
		this.props.setMapPos(mapX,mapY)
		this.props.setPlayerPos(this.state.width/2, this.state.height/2)
	}
	movePlayer(e){
		console.log(e.keyCode)
		let mapX = this.props.mapPos.x
		let mapY = this.props.mapPos.y;
     switch(e.keyCode){
				case 37:
						mapX += 10
						break
				case 38:
				 		mapY += 10
				 	break
				case 39:
				 		mapX -= 10
					 break
				case 40:
						mapY -= 10
		 }
		 this.props.setPlayerPos(this.state.width/2, this.state.height/2)
		 this.props.setMapPos(mapX,mapY)
	}

	loadData() {

    const data = {
      userID: this.props.userID,
      token: this.props.token
    }

    axios.post('/game-data', { data }).then(res => {
      setState({lvl: res.lvl});
	  setState({lp: res.lp});
	  setState({dp: res.dp});
	  setState({credits: res.credits});
	  setState({mana: res.mana});
	  setState({items: res.items});
	  setState({questsw: res.questsw});
	  setState({questso: res.questso});
	  setState({x: res.x});
	  setState({y: res.y});
	  setState({map: res.map});
	  console.log("Udało się.");
    });

  }

	componentDidMount() {
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
		window.addEventListener('keydown', this.movePlayer);
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
