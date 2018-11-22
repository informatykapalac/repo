import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import axios from 'axios';
import { Layer } from 'react-konva';

class Layer1 extends Component {
  constructor() {
    super();

    this.loadData = this.loadData.bind(this);
    this.createMap = this.createMap.bind(this);

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

export default Layer1;
