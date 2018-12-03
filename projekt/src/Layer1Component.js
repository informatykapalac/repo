import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import axios from 'axios';
import { Layer, Image, Rect} from 'react-konva';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token
  };
};

class Layer_1 extends Component {
  constructor() {
    super();

    this.loadData = this.loadData.bind(this);
    this.createMap = this.createMap.bind(this);

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

  createMap() {
    let GraphicsList = [];
    let ZoomX = this.state.props.width/1280;
    let ZoomY = this.state.props.height/720;
    for (let i=0; i<48; i++) {
      const x = new window.Image();
      x.src = './graphics/coblestone_center.bmp';
      GraphicsList[i] = x;
    }

    return GraphicsList.map((Graphic)=>{
      return(
        <Image
        image = {Graphic}
        width={320 * ZoomX}
        height={320 * ZoomY}
        />
      );
    });
  }

  render() {
    return(
      <Layer>
      <Rect width={10} height={10} fill="red" />
      </Layer>
    );
  }
}

const Layer1 = connect(mapStateToProps)(Layer_1);

export default Layer1;
