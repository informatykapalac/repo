import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import { Layer, Image, Rect } from 'react-konva';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token,
  };
};

class Layer_1 extends Component {
  constructor() {
    super();

    this.state = {
      GraphicsList: [],
      ZoomX: 0,
      ZoomY: 0,
    };

    this.loadData = this.loadData.bind(this);

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

  componentDidMount() {
    const lGraphicsList = [];
    const ZoomX = this.props.width/1280;
    const ZoomY = this.props.height/720; // DANE O WYS. I SZER. DO STATE !!!
    const wh = 320; // LICZBY MUSZĄ BYĆ STAŁE (OBLICZENIA NIEMOŻLIWE)
    const ht = 320;
    for (let i=0; i<48; i++) {
      const img = new window.Image(wh, ht);
      img.src = '/maps/Chessboard.bmp';
      lGraphicsList[i] = img;
      if(i === 47){
        img.onload = () =>{
          this.setState({GraphicsList: lGraphicsList});
          // NIE USUWAĆ -> console.log(this.state.GraphicsList);
        }
      }
    }
  }

  render() {
    return(
      <Layer>
        <Rect width={100} height={100} fill="red" x={0} y={0}/>
        {
          this.state.GraphicsList.map((Graphic)=>{
            return(
              <Image
              key = {uuidv4()}
              image = {Graphic}
              />
            );
          })
        }
      </Layer>
    );
  }
}

const Layer1 = connect(mapStateToProps)(Layer_1);

export default Layer1;
