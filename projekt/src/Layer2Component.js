import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import { Layer, Image, Rect } from 'react-konva';
import Layer2_config from './layer2_config';
import { runInThisContext } from 'vm';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token,
    avgZoom: state.avgZoom
  };
};

class Layer_2 extends Component {
  constructor() {
    super();
    this.state = {
      GraphicsList: [],
      GraphicPos: [
        {
          img_pos:0
        }
      ]
    }
  }

  componentDidMount() {
    const LgraphicList = [];
    Layer2_config.map((img_props, i)=>{
        const img = new window.Image;
        img.src = '/layer2/' + img_props.img_src;
        LgraphicList[i] = img;
        LgraphicList[i].size = img_props.img_size;
      img.onload = () =>{
        this.setState({GraphicsList: LgraphicList});
      }
    })
    this.Img_Selecion();
  }
  


  Img_Selecion(){
    console.log(this.state.GraphicsList.length)
    for(let ia=0; ia<this.state.GraphicPos.length;ia++) {
      console.log(this.state.GraphicsList.length)
      for(let i=0; i<this.state.GraphicsList.length;i++) {
        
      }
    }
  }




  render() {
    return(
      <Layer>
        <Rect width={100} height={100} fill="yellow" x={30} y={30}/>
        {
          this.state.GraphicsList.map((Graphic)=>{
            return(
              <Image
                image = {Graphic}
                key = {uuidv4()}
                width={Graphic.size * this.props.avgZoom}
                height={Graphic.size * this.props.avgZoom}
                x={0}
                y={0}
            />
            );
          })
        }
      </Layer>
    );
  };
};

const Layer2 = connect(mapStateToProps)(Layer_2);

export default Layer2;
