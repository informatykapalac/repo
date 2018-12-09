import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import axios from 'axios';
import { Layer, Image, Rect} from 'react-konva';
import Layer2_config from './layer2_config';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token,
    avgZoom: state.avgZoom,
    img_i: state.img_i
  };
};

class Layer_2 extends Component {
  constructor() {
    super();
    this.state = {
      GraphicsList: [],
      imgSize: 320,
      img_i: 1,             //odpowiada za wyświetlanie danego elementu z tabeli layer2_config.js docelowo ma byc brany ze store
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
      if (i==1) {
        img.onload = () =>{
          this.setState({GraphicsList: LgraphicList});
        }
        setInterval(()=>{
          this.setState({
            imgSize: 320 * this.state.avgZoom
          })
        }, 1000)
      }
    }
  } 


  render() {
    return(
      <Layer>
        <Rect width={100} height={100} fill="yellow" x={30} y={30}/>
        {
          this.state.GraphicsList.map((Graphic,i)=>{
            console.log(this.state.img_i)
            if(i==this.state.img_i){
              return(
              <Image
              image = {Graphic}
              width={this.state.imgSize}
              height={this.state.imgSize}
              x={this.state.GraphicPos.x}
              y={this.state.GraphicPos.y}
              />
            );
           }
          })
        }
      </Layer>
    );
  }
}

const Layer2 = connect(mapStateToProps)(Layer_2);

export default Layer2;
