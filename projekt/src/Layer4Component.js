import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import { Layer, Image, Rect} from 'react-konva';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token
  };
};

class Layer_4 extends Component {
  constructor() {
    super();
    //this.loadData = this.loadData.bind(this);
  }

  render() {
    return(
      <Layer>

        
      </Layer>
    );
  }
}

const Layer4 = connect(mapStateToProps)(Layer_4);

export default Layer4;
