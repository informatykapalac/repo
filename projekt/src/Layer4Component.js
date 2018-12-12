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
<<<<<<< HEAD
=======
    //this.loadData = this.loadData.bind(this);
>>>>>>> 254df956232b4638c0760535069258e39550939a
  }

  render() {
    return(
      <Layer>
<Rect width={100} height={100} fill="black" x={90} y={90}/>
      </Layer>
    );
  }
}

const Layer4 = connect(mapStateToProps)(Layer_4);

export default Layer4;
