import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import uuidv4 from 'uuid/v4';
import { Layer, Image, Rect } from 'react-konva';
import Layer2_config from './layer2_config';

const mapStateToProps = state => {
  return {
    userID: state.userID,
    token: state.token,
    mapPos: state.mapPos,
    avgZoom: state.avgZoom
  };
};

class Layer_2 extends Component {
  constructor() {
    super();
    this.state = {
      GraphicsList: [],
      GraphicPos: []
    }
  }


  componentDidMount() {
    const LgraphicList = [];
    Layer2_config.map((img_props, i)=>{
        const size = img_props.img_size
        const img = new window.Image(size,size);
        img.src = '/layer2/' + img_props.img_src;
        LgraphicList[i] = img;
        if(i===Layer2_config.length - 1) {
        img.onload = () =>{
          this.setState({GraphicsList: LgraphicList});
          this.setState({GraphicPos:[
            {
              img_nr:0,
              img_x:550,
              img_y:605
            },
            {
              img_nr:0,
              img_x:570,
              img_y:605
            },
            {
              img_nr:9,
              img_x:590,
              img_y:605
            }
          ]
          })
      }
     }
    })
  }
  

  render() {
    return(
      <Layer>
        <Rect width={100} height={100} fill="yellow" x={30} y={30}/>
        {
          this.state.GraphicPos.map((Graphic_Props,i)=>{
            const Graphic = this.state.GraphicsList[Graphic_Props.img_nr]; 
            
            if(Graphic_Props.img_nr == 0) {
              setTimeout(() => {
                let Grp = this.state.GraphicPos
                console.log(Grp)
                  Grp.splice(i,1)
                  this.setState({GraphicPos: Grp})
              }, 700);
            }
            
            return(
              <Image
                image = {Graphic}
                key = {uuidv4()}
                width={Graphic.width * this.props.avgZoom}
                height={Graphic.height * this.props.avgZoom}
                x={Graphic_Props.img_x + this.props.mapPos.x}
                y={Graphic_Props.img_y + this.props.mapPos.y}
            />
            );
          })
        }
      </Layer>
    );
  };
};

const Layer2 = connect(mapStateToProps)(Layer_2);

export default Layer2;
