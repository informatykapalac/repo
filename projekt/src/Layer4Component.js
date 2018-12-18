import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import { Layer, Image, Rect} from 'react-konva';
import Layer4_config from './layer4_config';
import uuidv4 from 'uuid/v4';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token,
	mapPos: state.mapPos,
    avgZoom: state.avgZoom
  };
};

class Layer_4 extends Component {
  constructor() {
    super();
	this.state = {
		GraphicsList: [],
		GraphicPos: []
	}
  }
  
  componentDidMount() {
    const LgraphicList = [];
    Layer4_config.map((img_props, i)=>{
        const img = new window.Image();
        img.src = '/layer4/' + img_props.img_src;
        LgraphicList[i] = img;
        if(i===Layer4_config.length - 1) {
        img.onload = () =>{
          this.setState({GraphicsList: LgraphicList});
          this.setState({GraphicPos:[
            {
              id: "0",
              img_nr:0,
              img_x:1200,
              img_y:1000
            },
            {
              id: "1",
              img_nr:1,
              img_x:1300,
              img_y:1000
            },
            {
              id: "2",
              img_nr:2,
              img_x:1350,
              img_y:1000
            }
          ]
          })
      }
     }
    })
  }

  render() {
    return(
      <Layer>
	  {
			this.state.GraphicPos.map((Graphic_Props)=>{
			const Graphic = this.state.GraphicsList[Graphic_Props.img_nr];
		return(
		<Image
                image = {Graphic}
                key = {uuidv4()}
                width={32 * this.props.avgZoom}
                height={32 * this.props.avgZoom}
                x={(Graphic_Props.img_x + this.props.mapPos.x) * this.props.avgZoom}
                y={(Graphic_Props.img_y + this.props.mapPos.y) * this.props.avgZoom}
            />
	  );
	})
	  }
      </Layer>
    );
  }
}

const Layer4 = connect(mapStateToProps)(Layer_4);

export default Layer4;
