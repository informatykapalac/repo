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
import Layer1_config1 from './maps/1/layer1_config';
import Layer2_config1 from './maps/1/layer2_config';
import Layer3_config1 from './maps/1/layer3_config';
import Layer4_config1 from './maps/1/layer4_config';
import { saveItems, setZoom, setScreenSize, setMapPos, setPlayerPos, setGraphics } from './Redux/reduxActions';

//      WSZYSTKIE PLIKI CONFIG BĘDĄ POBIERANE Z PLIKU ZEWNĘTRZNEGO

const mapStateToProps = state => {
  return {
    user_ID: state.user_ID,
	  name: state.name,
	lvl: state.lvl,
	lp: state.lp,
	dp: state.dp,
	credits: state.credits,
	mana: state.mana,
	items: state.items,
	questsw: state.questsw,
	questso: state.questsw,
	x: state.x,
	y: state.y,
	map: state.map,
	mapPos: state.mapPos,
	screenSize: state.screenSize,
	avgZoom: state.avgZoom,
	playerPos: state.playerPos,
  mapPosX: state.x, // nie istnieje
  mapPosY: state.y // nie istnieje
  };
};

const mapDispatchToProps = dispatch => {
  return {
		saveItems: (lvl, lp, dp, credits, mana, items, questsw, questso, x, y, map) => dispatch(saveItems(lvl, lp, dp, credits, mana, items, questsw, questso, x, y, map)),
		setScreenSize: (width, height) => dispatch(setScreenSize(width, height)),
		setMapPos: (x, y) => dispatch(setMapPos(x, y)),
		setPlayerPos: (x,y) => dispatch(setPlayerPos(x,y)),
		setZoom: value => dispatch(setZoom(value)),
    setGraphics: value => dispatch(setGraphics(value))
  };
};

class _Game extends Component {
	constructor() {
		super();
		this.state = {
			width: window.innerWidth,
			height: window.innerHeight,
			user_ID: 1,
			name: "",
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
			map: 1,
			redirect: false
		};

		this.handleResize = this.handleResize.bind(this);
		this.movePlayer = this.movePlayer.bind(this);
    this.loadGraphics = this.loadGraphics.bind(this);
	}

	handleResize() {
    this.loadGraphics();
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
      userID: this.state.user_ID
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
	}).catch((error) => {
	  if(error.response) {
		this.setState({
		  	error: error.response.status + " " + error.response.data
		});
	  }
	});

  }

  loadGraphics() {

    let data = {
      layer1: [],
      layer2: [],
      layer3: [],
      layer4: []
    };

    let path, path2, path3, path4;

    // duży switch...case ?

    Layer1_config1.map((image, i) => {
      const wh = 320;
      const ht = 320;
      const img = new window.Image(wh, ht);
      img.src = '/maps/1/layer1/' + image.img_src;
      data.layer1[i] = img;
    });

    Layer2_config1.map((image, i) => {
      const img = new window.Image();
      img.src = '/maps/1/layer2/' + image.img_src;
      data.layer2[i] = img;
    });

    Layer3_config1.map((image, i) => {
      const size = image.img_size;
      const img = new window.Image(size, size);
      img.src = '/maps/1/layer3/' + image.img_src;
      data.layer3[i] = img;
      console.log(img);
    });

    Layer4_config1.map((image, i) => {
      const img = new window.Image();
      img.src = '/maps/1/layer4/' + image.img_src;
      data.layer4[i] = img;
    });

    this.props.setGraphics(data);

  }

  /*    << NIE DZIAŁA
    saveing(){
		setInterval({
			const position={
				this.state.x,
				this.state.y,
				this.state.map
			};
			const Savedata={
				userID: this.state.user_ID,
				lvl: this.state.lvl,
				lp: this.state.lp,
				dp: this.state.dp,
				credits: this.state.credits,
				mana: this.state.mana,
				items: this.state.items,
				questsw: this.state.questsw,
				questso: this.state.questso,
				questsw: this.state.questsw,
				position: this.state.position
			}
			axios.post('/saveing', { Savedata }).then(res => {
				//tu chyba nic się nie dzieje
			}).catch((error) => {
			  if(error.response) {
				this.setState({
					error: error.response.status + " " + error.response.data
				});
			  }
			});
			if(this.state.save==true){
				this.setState({
					redirect: true
				});
			}
		}, 900000);
	}
*/
	componentDidMount() {
		this.handleResize();
    this.loadGraphics();
		window.addEventListener('resize', this.handleResize);
		window.addEventListener('keydown', this.movePlayer);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

/*		<<==== NIE DZIAŁA
	isRedirected() {
		if(this.state.redirect) {
			return <Redirect to="/login"/>
		}
	}
*/
	render() {

		return(
			// {this.isRedirected()}    <<===== to tujaj nie działa nie pytajcie sie mnie czemu (wiktor)
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
