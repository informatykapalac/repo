import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import { Layer, Image, Rect } from 'react-konva';
import Layer2_config from './layer2_config';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token,
    avgZoom: state.avgZoom
  };
};

class Layer_2 extends Component {
  constructor() {
    super();
    this.state = {
      GraphicsList: [],
      imgSize: 320,
      GraphicPos:{
        x:0,
        y:0
      }
    }
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
    const LgraphicList = [];
    for (let i=0; i<2;i++) {
      const img = new window.Image;
      img.src = '/layer2/' + Layer2_config[i];
      LgraphicList[i] = img;
      console.log(Layer2_config[i]);
      img.onload = () =>{
        this.setState({GraphicsList: LgraphicList});
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
        <Rect width={100} height={100} fill="yellow" x={30} y={30}/>
        {
          this.state.GraphicsList.map((Graphic,i)=>{
              return(
              <Image
              image = {Graphic}
              key = {uuidv4()}
              width={this.state.imgSize}
              height={this.state.imgSize}
              x={this.state.GraphicPos.x}
              y={this.state.GraphicPos.y}
              />
            );

          })
        }
      </Layer>
    );
  }
}

const Layer2 = connect(mapStateToProps)(Layer_2);

export default Layer2;
