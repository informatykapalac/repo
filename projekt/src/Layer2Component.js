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
        const img = new window.Image();
        img.src = '/layer2/' + img_props.img_src;
        LgraphicList[i] = img;
        if(i===Layer2_config.length - 1) {
        img.onload = () =>{
          this.setState({GraphicsList: LgraphicList});
          this.setState({GraphicPos:[
            {
              id: "0",
              img_nr:21,
              img_x:1000,
              img_y:1000
            },
            {
              id: "1",
              img_nr:22,
              img_x:1100,
              img_y:1000
            },
            {
              id: "2",
              img_nr:23,
              img_x:1050,
              img_y:1000
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
        {
          this.state.GraphicPos.map((Graphic_Props)=>{
            const Graphic = this.state.GraphicsList[Graphic_Props.img_nr];

            if(Graphic_Props.img_nr < 6) {
              const id = Graphic_Props.id;
              setTimeout(() => {
                this.state.GraphicPos.map((Graph, i)=>{
                  if(Graph.id == id){
                    let Grp = this.state.GraphicPos
                    Grp.splice(i,1)
                    this.setState({GraphicPos: Grp})
                    return;
                  }
                })
              }, 700);
            }

            return(
              <Image
                image = {Graphic}
                key = {uuidv4()}
                width={32 * this.props.avgZoom}
                height={32 * this.props.avgZoom}
                x={(Graphic_Props.img_x + this.props.mapPos.x) * this.props.avgZoom}
                y={(Graphic_Props.img_y + this.props.mapPos.y) * this.props.avgZoom}
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
