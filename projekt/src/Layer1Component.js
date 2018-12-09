import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import { Layer, Image, Rect } from 'react-konva';
import mapConfig from './mapConfig';
import { setMapPos } from './Redux/reduxActions';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token,
    screenSize: state.screenSize,
    mapPos: state.mapPos,
    avgZoom: state.avgZoom
  };
};

class Layer_1 extends Component {
  constructor() {
    super();

    this.state = {
      GraphicsList: [],
      imgSize: 320,
    };

    //this.loadData = this.loadData.bind(this);

  }

  /*loadData() {

    const data = {
      userID: this.props.userID,
      token: this.props.token
    }

    axios.post('/game-data', { data }).then(res => {
      console.log("DONE");
    });
  }*/

  componentDidMount() {
    const lGraphicsList = [];
    const wh = 320;
    const ht = 320;
    for (let i=0; i<48; i++) {
      const img = new window.Image(wh, ht);
      img.src = '/maps/' + mapConfig[i];
      lGraphicsList[i] = img;
      if(i === 47){
        img.onload = () =>{
          this.setState({GraphicsList: lGraphicsList});
          /*setInterval(()=>{
            this.setState({
              imgSize: 320 * this.props.avgZoom
            })
          }, 5000)*/
          // NIE USUWAĆ -> console.log(this.state.GraphicsList);
        }
      }
    }
  }

  componentWillReceiveProps(props) {
    const temp = props.avgZoom * 320;
    //console.log(temp);
    if(temp != this.state.imgSize) {
      this.setState({
        imgSize: temp
      });
    }
  }

  render() {
    return(
      <Layer>
        {
          this.state.GraphicsList.map((Graphic, i)=>{
            const posX = this.props.mapPos.x + this.state.imgSize * (i % 8);
            const posY = this.props.mapPos.y + this.state.imgSize * (Math.floor(i/8));
            return(
              <Image
              key = {uuidv4()}
              image = {Graphic}
              width={this.state.imgSize}
              height={this.state.imgSize}
              x={posX}
              y={posY}
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
