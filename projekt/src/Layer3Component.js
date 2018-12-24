import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import axios from 'axios';
import { Layer, Image, Rect} from 'react-konva';
import uuidv4 from 'uuid/v4';
import Layer3_config from './layer3_config';


const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token,
    screenSize: state.screenSize,
    mapPos: state.mapPos,
    avgZoom: state.avgZoom,
    playerPos: state.playerPos,
    graphics: state.graphics.layer3
  };
};

class Layer_3 extends Component {
  constructor() {
    super();
    this.state = {
      GraphicsList: [],
      GraphicPos: []
    }
  }

  componentDidMount() {
    /*const LgraphicList = [];
    Layer3_config.map((img_props, i)=>{
        const size = img_props.img_size
        const img = new window.Image(size,size);
        img.src = '/layer3/' + img_props.img_src;
        LgraphicList[i] = img;
      img.onload = () =>{
        this.setState({GraphicsList: LgraphicList});
        this.setState({GraphicPos:[
          {
            img_nr:0,
            img_x:1000,
            img_y:900
          }
          {
            img_nr:1,
            img_x:578,
            img_y:605
          }
         ]
        })
      }
    })*/
  }

  componentDidUpdate() {
    this.state.GraphicsList.map((image, i) => {
      //if(i == this.state.GraphicsList.length - 1) {
        image.onload = () => {
          this.setState(this.state);
        }
      //}
    })
    if(this.state.GraphicPos.length < 1) { // tymczasowo tutaj dajemy dane o pozycji
      this.setState({
        GraphicPos: [{
          img_nr:0,
          img_x:1000,
          img_y:900
        }]
      });
    }
  }

  componentWillReceiveProps(props) {
    if(props.graphics != this.state.GraphicsList && props.graphics) {
      this.setState({
        GraphicsList: props.graphics
      });
    }
  }

  render() {
    return(
      <Layer>
        {
          this.state.GraphicPos.map((Graphic_Props) => {
            const Graphic = this.state.GraphicsList[Graphic_Props.img_nr];
           // console.log(this.props.mapPos)
            return(
              <Image
                image = {Graphic}
                key = {uuidv4()}
                width={Graphic.width * this.props.avgZoom}
                height={Graphic.height * this.props.avgZoom}
                x={this.props.playerPos.x - Graphic.width/2}
                y={this.props.playerPos.y - Graphic.height/2}
              />
            );
          })
        }
      </Layer>
    );
  }
}

const Layer3 = connect(mapStateToProps)(Layer_3);

export default Layer3;
