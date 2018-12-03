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

class Layer_2 extends Component {
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

  render() {
    return(
      <Layer>
<Rect width={10} height={10} fill="black" />
      </Layer>
    );
  }
}

const Layer2 = connect(mapStateToProps)(Layer_2);

export default Layer2;
