import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import axios from 'axios';
import { Layer } from 'react-konva';

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

    let tilesonmap = [];
    let zoomx = 0;
    let zoomy = 0;
    let x = 0;
    let y = 0;

    zoomx = this.state.props.width/1280;
    zoomy = this.state.props.height/720;
    tilesonmap.x = 320*zoomx;
    tilesonmap.y = 320*zoomy;

for(let i=0; i,<48; i++)
{

  let x = new window.createImageBitmap();
  x.src = './graphics/coblestone_lower-right.bmp';
  tilesonmap[i] = x;

}
tilesonmap.map((tilesonmap)=>{

<Image
image = {tilesonmap}
>

});
  }

  render() {
    return(
      <Layer>

      </Layer>
    );
  }
}

const Layer1 = connect(mapStateToProps)(Layer_1);

export default Layer1;
