/**
 * Created by thisara on 4/19/16.
 */
import React, { PropTypes, Component } from 'react';
import styles from './ElephantPage.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class ElephantPage extends Component {

  constructor() {
    super();
    this.state = {
      attempt: 1,
      remainingTime: 15,
      points: 0
    };

    this.timer = null;
    this.interval = null;

    this.gridSize =23;
    this.drawEye = this.drawEye.bind(this);
    this.startTimer = this.startTimer.bind(this);

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

    pointsMap[eyeX][eyeY] = 100;


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
    imageObj.src = '/Screen-2-Elephant-v4.png';

    // add the layer to the stage
    stage.add(layer);

    stage.on('contentClick', () => {

      if(this.state.attempt <= 3) {
        clearInterval(this.interval);
        clearTimeout(this.timer);


        const pos = stage.getPointerPosition();

        const xCord = Math.floor(pos.x / gridSize);
        const yCord = Math.floor(pos.y / gridSize);

        //console.log('grid pos: '+ xCord +', '+yCord);
        //console.log('points: '+ pointsMap[xCord][yCord]);



        // check for # attempts
        const prevAttempt = this.state.attempt;


          layer.add(this.drawEye(xCord, yCord));
          layer.draw();
          this.setState({points: this.state.points + pointsMap[xCord][yCord]})

          this.setState({attempt: this.state.attempt + 1});




        if((prevAttempt + 1) <= 3) {
          this.startTimer();
        }
        else{
          // do not start timer
        }


      }
      else{
        alert('game over')
      }
    });





    // start timer
    this.startTimer();
  }

  startTimer() {
    this.setState({remainingTime: 15});

    this.interval = setInterval(() => {
      this.setState({remainingTime: this.state.remainingTime -1})
    }, 1000);

    this.timer = setTimeout(() =>{
      const prevAttempt = this.state.attempt;

      clearInterval(this.interval);
      this.setState({attempt: this.state.attempt +1})

      if((prevAttempt +1) >= 3){
        // game over
        alert('game over');
      }
      else{
        this.startTimer();

      }
      this.setState({remainingTime: 15});
    }, 15000)
  }

  render() {
    return (
      <div>
        <div id="container" className="canvas">

        </div>

        <div className="timer">
          <div><span className="attempts">{(this.state.attempt <= 3) ? this.state.attempt: 3}</span>&nbsp;&nbsp;Attempts</div>
          <div><span className="time">{this.state.remainingTime}</span>&nbsp;&nbsp;Sec</div>
          {
/*
            <h3>{this.state.points + ' points'}</h3>
*/
          }
        </div>

        <div className="points-box">
          <div>Points</div>
          <div className="points">
            {this.state.points}
          </div>
        </div>
      </div>



    );
  }
}

export default ElephantPage;
