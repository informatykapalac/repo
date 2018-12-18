import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import uuidv4 from 'uuid/v4';
import { Layer, Image, } from 'react-konva';
import Layer5_config from './layer5_config';

const mapStateToProps = state => {
	return{
		userID: state.userID,
		screenSize: state.screenSize,
		avgZoom: state.avgZoom
	};
};

class Layer_5 extends Component {
	constructor(){
		super();
		this.state = {
		GraphicsList: [],
		GraphicPos: [],
		wi:0,
		hi:0
		}
	}
	componentDidMount() {
		const LgraphicList = [];
    Layer5_config.map((img_props, i) => {
        const img = new window.Image();
        img.src = '/layer5/' + img_props.img_src;
				LgraphicList[i] = img;
        if(i==Layer5_config.length - 1) {
        	img.onload = () => {
          	this.setState({ GraphicsList: LgraphicList });
          	this.setState({ GraphicPos: [
							{
								id: "0",
								img_nr:0,
								img_x:0,
								img_y:0
				  		},
          	]
					});
      	}
     	}
    })
	}


	render(){
		return(
		<Layer>
			{
            this.state.GraphicPos.map((Graphic_Props)=>{
			const Graphic = this.state.GraphicsList[Graphic_Props.img_nr];
			console.log("2")
			if(Graphic_Props.img_nr == 0) { 
				 this.state.wi = 1280 * (this.props.screenSize.w / 1280)
				 this.state.hi = 720 * (this.props.screenSize.h / 720)
			}	else {
				this.state.wi = Graphic.width
				this.state.hi = Graphic.height
			}
            return(
              <Image
                image = {Graphic}
                key = {uuidv4()}
                width={this.state.wi}
                height={this.state.hi}
                x={Graphic_Props.img_x}
                y={Graphic_Props.img_y}
            />
			);
          })
        }
		</Layer>
		);
	}
}

const Layer5 = connect(mapStateToProps)(Layer_5);

export default Layer5;
