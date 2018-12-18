import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Konva from 'konva';
import { Stage } from 'react-konva';
import Layer1 from './Layer1Component';
import Layer2 from './Layer2Component';
import Layer3 from './Layer3Component';
import Layer4 from './Layer4Component';
import Layer5 from './Layer5Component';
import { saveItems, setZoom, setScreenSize, setMapPos, setPlayerPos } from './Redux/reduxActions';

const mapStateToProps = state => {
  return {
    userID: state.userID,
		token: state.token,
		mapPos: state.mapPos, // mapPos nie istnieje -> obecnie x, y
		screenSize: state.screenSize,
		avgZoom: state.avgZoom,
		playerPos: state.playerPos,
    mapPosX: state.x,
    mapPosY: state.y
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
		const mapX = -((2560*avgZoom - this.state.width)/2);
		const mapY = -((1920*avgZoom - this.state.height)/2);
	console.log('x0: ' + mapX + "y0: " + mapY)
		this.props.setScreenSize(this.state.width, this.state.height);
		this.props.setZoom(avgZoom);
		this.props.setMapPos(mapX,mapY)
		this.props.setPlayerPos(this.state.width/2, this.state.height/2)
	}
	movePlayer(e){
		//console.log(e.keyCode)
    console.log(this.props.x, " ", this.props.y); // zły zapis w Redux
		const key = e.keyCode;
		const scrW = this.props.screenSize.w;
		const scrH = this.props.screenSize.h;
		const playerR = 40; // komentarz ?
		const playerSp = 15;
		let mapX = this.props.mapPos.x
		let mapY = this.props.mapPos.y;
		let playerX = this.props.playerPos.x;
		let playerY = this.props.playerPos.y;
		if(key === 37 || key === 65){
			if(mapX < 0  && playerX === scrW /2){
				mapX += playerSp
			}else if (playerX > playerR){
				playerX -= playerSp
			}
			//console.log(playerX)
		}
		else if(key === 39 || key === 68){
			if(mapX > -(2560*this.props.avgZoom - scrW) && playerX === scrW /2){
				mapX -= playerSp
			}
			else if (playerX < (scrW - playerR)){
				playerX += playerSp
			}
			//console.log(playerX)
		}
		if(key === 38 || key === 87){
			if(mapY < 0 && playerY === scrH /2){
				mapY += playerSp
			}
			else if (playerY > playerR){
				playerY -= playerSp
			}
			//console.log(playerY)
		}
		else if(key === 40 || key === 83){
			if(mapY > -((1920 * this.props.avgZoom) - scrH) && playerY === scrH /2){
				mapY -= playerSp
			}
			else if (playerY < (scrH - playerR)){
				playerY += playerSp
			}
			//console.log(playerY)
		}
		 this.props.setPlayerPos(playerX, playerY)
		 this.props.setMapPos(mapX,mapY)
	}

	loadData() {

    const data = {
      userID: this.props.userID,
      token: this.props.token
    }

    axios.post('/game-data', { data }).then(res => {
      this.setState({lvl: res.lvl});
	  this.setState({lp: res.lp});
	  this.setState({dp: res.dp});
	  this.setState({credits: res.credits});
	  this.setState({mana: res.mana});
	  this.setState({items: res.items});
	  this.setState({questsw: res.questsw});
	  this.setState({questso: res.questso});
	  this.setState({x: res.x});
	  this.setState({y: res.y});
	  this.setState({map: res.map});
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
			<Layer5/>
			</Stage>
		);
	}
}

const Game = connect(mapStateToProps, mapDispatchToProps)(_Game);

export default Game;
