import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import uuidv4 from 'uuid/v4';
import { Layer, Image, Rect } from 'react-konva';
import mapConfig from './mapConfig';

const mapStateToProps = state => {
	return{
		userID: state.userID,
		screenSize: state.screenSize,
		mapPos: state.mapPos,
		avgZoom: state.avgZoom
	};
};

class Layer_5 extends Component {
	constructor(){
		super();
		
		
	}
	render(){
		return(
		<Layer>
		</Layer>
		);
	}
}

const Layer5 = connect(mapStateToProps)(Layer_5);

export default Layer5;
