/**
 * Created by thisara on 4/19/16.
 */
import React, { PropTypes, Component } from 'react';
import styles from './ElephantPage.css';
import withStyles from '../../decorators/withStyles';
import socketClient from 'socket.io-client';

@withStyles(styles)
class ElephantPage extends Component {

  constructor() {
    super();
    this.state = {
      attempt: 0
    };

    this.gridSize =23;
    this.drawEye = this.drawEye.bind(this);

  }


  drawEye(x, y) {


    var rect = new Konva.Circle({
      x: x * this.gridSize + this.gridSize / 2,
      y: y * this.gridSize + this.gridSize / 2,

      radius: this.gridSize / 2,

      fill: 'green',
      stroke: 'black',
      strokeWidth: 1
    });



    return rect;

  }

  componentDidMount() {

    this.setupRealtime();

    const scale = 1;
    const width = 1024;
    const height= 768;

    const gridSize = this.gridSize;

    const gridRows = Math.floor(height*scale / gridSize);
    const gridColumns = Math.floor(width*scale / gridSize);
    const eyeX =8, eyeY= 7;

    /*
    * col: 40
    * row: 30
    * */

    const pointsMap = [];
    // init map
    for(var x=0; x<= gridColumns; x++){
      pointsMap[x]= [];


      for(var y=0; y<= gridRows; y++){

        pointsMap[x][y] = 0;


        // points based on distance to thr point
        const dist = Math.sqrt(Math.pow((x-eyeX),2) + Math.pow((y-eyeY),2));
        pointsMap[x][y] = Math.ceil(((gridColumns - dist) * 2) / 10) * 10;


        if((x >= 6 && x<= 10) &&(y >= 5 && y <= 9)){
          pointsMap[x][y] = 80;
        }

        if((x >= 7 && x<= 9) &&(y >= 6 && y <= 8)){
          pointsMap[x][y] = 90;
        }




      }
    }




    pointsMap[8][7] = 100;


    console.log(gridColumns)
    console.log(gridRows)

    var stage = new Konva.Stage({
      container: 'container',
      width: width*scale,
      height: height*scale
    });

    var layer = new Konva.Layer();



    var imageObj = new Image();
    imageObj.onload = function() {

      var yoda = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: width,
        height: height
      });

      // add the shape to the layer
      layer.add(yoda);

      // add the layer to the stage
      stage.add(layer);
    };
    imageObj.src = '/Screen-2-Elephant.png';

    // add the layer to the stage
    stage.add(layer);


    // will be trigger only in components
/*    elephant.on('click', () => {


    });*/

    // trigger every where


    stage.on('contentClick', () => {
      // set selected state
      this.setState({attempt: this.state.attempt+1});


      const pos = stage.getPointerPosition();

      const xCord = Math.floor(pos.x / gridSize);
      const yCord = Math.floor(pos.y / gridSize);

      console.log('grid pos: '+ xCord +', '+yCord);
      const dist = Math.sqrt(Math.pow((xCord-eyeX),2) + Math.pow((yCord-eyeY),2));
      console.log('dist: '+dist);

      console.log('points: '+ pointsMap[xCord][yCord]);

      layer.add(this.drawEye(xCord, yCord));
      layer.draw();


      // check for # attempts
      if(this.state.attempt == 3){
        alert('game over');
        this.setState({attempt: 0});

      }
    });

  }

  render() {
    return (
      <div id="container" className="canvas">

      </div>

    );
  }

  setupRealtime() {
    const io = socketClient();
    io.on('coordinate-change', (change) => {
      console.log('new_val - ', JSON.stringify(change.new_val));
    });
    return io;
  }
}

export default ElephantPage;
