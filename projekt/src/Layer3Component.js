import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import axios from 'axios';
import { Layer, Image, Rect} from 'react-konva';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token,
    mapPos: state.mapPos,
    avgZoom: state.avgZoom
  };
};

class Layer_3 extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return(
      <Layer>
        <Rect width={100} height={100} fill="green" x={60} y={60}/>
      </Layer>
    );
  }
}

const Layer3 = connect(mapStateToProps)(Layer_3);

export default Layer3;
