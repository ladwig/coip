import { Component, createRef } from 'react'
import { Image } from 'react-bootstrap'
import Head from 'next/head'
import WSAvcPlayer from 'ws-avc-player/lib/WSAvcPlayer.js';

class Video extends Component {
  constructor(props) {
    super(props);
  //  this.canvas = createRef();
  }
  //Hier sollte die Videofunktion eingefuegt werden. Stream von Rapsi zu Backend funktioniert,
  //das rendern des Video canvas nicht
  
componentDidMount() {
// const uri = "ws://192.168.0.19:8080";
// let wsavc = new WSAvcPlayer(this.canvas, "webgl");
// wsavc.connect(uri);
}

render() {
    return (
      <div>
//	<canvas width="960" height="540" ref={this.canvas}></canvas>
  <canvas width="960" height="540"></canvas>
     </div>
    )
  }
}

export default Video
