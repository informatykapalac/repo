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
