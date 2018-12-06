import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import axios from 'axios';
import { Layer, Image, Rect} from 'react-konva';
import mapConfig from './maps/mapConfig';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token,
  };
};

class Layer_1 extends Component {
  constructor() {
    super();
    this.loadData = this.loadData.bind(this);
    this.createMap = this.createMap.bind(this);

    this.state = {
      GraphicsList: [],
    }

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

    let ZoomX = this.props.width/1280;
    let ZoomY = this.props.height/720;
    for (let i=0; i<48; i++) {
      console.log(mapConfig[i]);
      const img = new window.Image();
      img.src = "maps/che"//'./maps/' + mapConfig[i];
      img.onload = () => {
        this.setState({GraphicsList: GraphicsList})
        console.log("Załadowany! Fire!")
      }
      GraphicsList[i] = img;
    }

    return GraphicsList.map((Graphic)=>{
      return(
        <Image
        image = {Graphic}
        width={320 * ZoomX}
        height={320 * ZoomY}
        x={0}
        y={0}
        />
      );
    });
  }

  render() {
    return(
      <Layer>
      <Rect width={100} height={100} fill="red" x={0} y={0}/>
      {this.createMap()}
      </Layer>
    );
  }
}

const Layer1 = connect(mapStateToProps)(Layer_1);

export default Layer1;
