/**
 * Created by thisara on 4/19/16.
 */
import React, { PropTypes, Component } from 'react';
import styles from './ElephantPage.css';
import withStyles from '../../decorators/withStyles';
import socketClient from 'socket.io-client';
import { getUser, removeUser } from './../../core/CommonUtils';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';


var Victor = require('victor');
var layer;
var directionX = 0, directionY = 0;
const pointsMap = [];
var hexagon;
const st = ['st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th'];
@withStyles(styles)
class ElephantPage extends Component {

  constructor() {
    super();
    this.state = {
      attempt: 1,
      remainingTime: 15,
      points: 0,
      isShowingModal: false,
    };

    this.timer = null;
    this.interval = null;

    this.gridSize = 23;
    this.drawEye = this.drawEye.bind(this);
    this.startTimer = this.startTimer.bind(this);

    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  drawEye(x, y) {


    var rect = new Konva.Circle({
      x: x * this.gridSize + this.gridSize / 2,
      y: y * this.gridSize + this.gridSize / 2,

      radius: this.gridSize / 2,

      fill: '#ff8400',
      stroke: 'black',
      strokeWidth: 1
    });


    return rect;

  }

  handleNextButton(e) {
    e.preventDefault();
    window.location.href = '/';

  }


  handleClick (){
    this.setState({isShowingModal: true});
    this.savePlayer(getUser(), this.state.points);

  }
  
  handleClose() {
    this.setState({isShowingModal: false});
    window.location.href = '/';
  }

  componentDidMount() {

    this.setupRealtime();

    const scale = 1;
    const width = 1024;
    const height = 768;

    const gridSize = this.gridSize;

    const gridRows = Math.floor(height * scale / gridSize);
    const gridColumns = Math.floor(width * scale / gridSize);
    const eyeX = 8, eyeY = 7;

    /*
     * col: 40
     * row: 30
     * */


    /*
     * random ball logic
     * */

    /*
     var dx = 0;
     var dy = 0;
     var delta = 5; // range (from 0) of possible dx or dy change
     var max = 15; // maximum dx or dy values
     */


    /*
     * Random ball logic 2
     * */
    var x = 800;
    var y = height / 2;
    var dx = 15;
    var dy = 15;
    var ballRadius = this.gridSize / 2;


    /*
     * Generation of points map based on distance
     * */
    // init map
    for (var x = 0; x <= gridColumns; x++) {
      pointsMap[x] = [];


      for (var y = 0; y <= gridRows; y++) {

        pointsMap[x][y] = 0;


        // points based on distance to thr point
        const dist = Math.sqrt(Math.pow((x - eyeX), 2) + Math.pow((y - eyeY), 2));
        pointsMap[x][y] = Math.ceil(((gridColumns - dist) * 2) / 10) * 5;




	if ((x >= 3 && x <= 13) && (y >= 2 && y <= 12)) {
          pointsMap[x][y] = 80;
        }

	if ((x >= 4 && x <= 12) && (y >= 3 && y <= 11)) {
          pointsMap[x][y] = 85;
        }
        if ((x >= 6 && x <= 10) && (y >= 5 && y <= 9)) {
          pointsMap[x][y] = 90;
        }

        if ((x >= 7 && x <= 9) && (y >= 6 && y <= 8)) {
          pointsMap[x][y] = 95;
        }

        if ((x >= 0 && x < 3) && (y >= 0 && y < 3)) {
          pointsMap[x][y] = 0;
        }

	if ((x >= 3 && x < 5) && (y >= 3 && y < 5)) {
          pointsMap[x][y] = 10;
        }


      }
    }
    // winning point
    pointsMap[eyeX][eyeY] = 100;


    console.log(gridColumns);
    console.log(gridRows);

    /*
     * Konva Init
     * */
    var stage = new Konva.Stage({
      container: 'container',
      width: width * scale,
      height: height * scale
    });

    layer = new Konva.Layer();


    var imageObj = new Image();
    imageObj.onload = function () {

      var elephant = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: width,
        height: height
      });

      // add the shape to the layer
      layer.add(elephant);

      // bouncing ball
      hexagon = new Konva.Circle({
        x: stage.getWidth() / 2,
        y: stage.getHeight() / 2,
        radius: ballRadius,
        fill: '#b21605',
        stroke: 'black',
        strokeWidth: 1
      });

      layer.add(hexagon);


      // add the layer to the stage
      //stage.add(ballLayer);

      stage.add(layer);


      var anim = new Konva.Animation(function (frame) {

        var vec1 = new Victor(dx, dy);
        var dir = new Victor(directionX, directionY);

        var angle = dir.horizontalAngle();
        var angle1 = vec1.horizontalAngle();

        //vec1= new Victor(0,0);
        if (angle != 0) {
          //vec1 = vec1.rotate(0-angle);
          vec1 = vec1.rotate((angle + angle1) / 2);

          //console.log(vec1);
        }


        directionX = 0;
        directionY = 0;

        dx = vec1.x;
        dy = vec1.y;


        if (x + dx > width - ballRadius || x + dx < ballRadius) {
          dx = -dx;
        }
        if (y + dy > height - ballRadius || y + dy < ballRadius) {
          dy = -dy;
        }

        x += dx;
        y += dy;


        hexagon.setX(x);
        hexagon.setY(y);
      }, layer);

      anim.start();
    };
    imageObj.src = '/Screen-2-Elephant-v4.png';


    /*
     * Stage click listener
     * */
    stage.on('contentClick', () => {

    });


    // start timer
    this.startTimer();
  }

  startTimer() {
    this.setState({remainingTime: 15});

    this.interval = setInterval(() => {
      this.setState({remainingTime: this.state.remainingTime - 1})
    }, 1000);

    this.timer = setTimeout(() => {
      const prevAttempt = this.state.attempt;

      clearInterval(this.interval);
      this.setState({attempt: this.state.attempt + 1})

      if ((prevAttempt + 1) > 3) {
        // game over
        //alert('game over');
        this.handleClick();
      }
      else {
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
          <div><span className="attempts">{(this.state.attempt <= 3) ? this.state.attempt : 3 }</span> jk jdrh
          </div>
          <div>;;a' <span className="time">{this.state.remainingTime}</span></div>
          {
            /*
             <h3>{this.state.points + ' points'}</h3>
             */
          }
        </div>

        <div className="points-box">
          <div>,l=Kq</div>
          <div className="points">
            {this.state.points}
          </div>
        </div>

        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <div className="center modal-text">
              <h1 className="modal-header">;r. jdrh wjika</h1>
              <h2>Tn ,nd .;a ,l=Kq ixLHdj</h2>
              <div className="points">
                {this.state.points}
              </div>
              <button className="modal-button" onClick={this.handleNextButton}>,l=Kq mqjrej</button>

              </div>
            </ModalDialog>
          </ModalContainer>
        }
      </div>



    );
  }

  setupRealtime() {
    const io = socketClient();
    io.on('coordinate-change', (change) => {
      console.log('new_val - ', (change.new_val));


      let x = parseInt(change.new_val.x);
      let y = parseInt(change.new_val.y);
      x = (Math.abs((x - 512)) > 20) ? (x - 512) : 0;
      y = (Math.abs((y - 512)) > 20) ? (y - 512) : 0;


      /*
       * change directionX & directionY according to this.
       * */
      directionX = x;
      directionY = y;
      console.log(x + ' ' + y);

      if (change.new_val.clicked === "0") {
        if (this.state.attempt <= 3) {
          //if (true) {
          clearInterval(this.interval);
          clearTimeout(this.timer);


          const xCord = Math.floor(hexagon.getX() / this.gridSize);
          const yCord = Math.floor(hexagon.getY() / this.gridSize);


          const prevAttempt = this.state.attempt;


          layer.add(this.drawEye(xCord, yCord));
          layer.draw();
          this.setState({points: this.state.points + pointsMap[xCord][yCord]})

          this.setState({attempt: this.state.attempt + 1});


          if ((prevAttempt + 1) <= 3) {
            this.startTimer();
          }
          else {
            // do not start timer
            setTimeout(() => {
              //alert('game over');
              this.handleClick();


            }, 1000);
          }


        }
        else {
          //('game over')
        }
      }

    });
    return io;
  }

  savePlayer(username, points) {
    $.ajax({
      method: 'POST',
      url: '/leaderboard/add',
      data: {
        username: username,
        points: points,
      }
      ,
      success: (data) => {
        removeUser();
        console.log("savePlayer success");
      },
      error: (xhr, status, err) => {
        console.error('', status, err.toString());
      }
    });
  }
}

export default ElephantPage;
