import { Component, createRef } from 'react'
import { Image, Alert } from 'react-bootstrap'
import Head from 'next/head'
import WSAvcPlayer from 'ws-avc-player/lib/WSAvcPlayer.js';

class Video extends Component {
  constructor(props) {
    super(props);
  //  this.canvas = createRef();
  this.state = {
    show: true
  };
  this.handleShow = this.handleShow.bind(this);
  }
  //Hier sollte die Videofunktion eingefuegt werden. Stream von Rapsi zu Backend funktioniert,
  //das rendern des Video canvas nicht

//componentDidMount() {
// const uri = "ws://192.168.0.19:8080";
// let wsavc = new WSAvcPlayer(this.canvas, "webgl");
// wsavc.connect(uri);
//}
//	for render() <canvas width="960" height="540" ref={this.canvas}></canvas>

handleShow() {
  this.setState({
    show: false
  });
}

render() {
    return (
      <div>
      <Alert show={this.state.show} variant="success">
   <Alert.Heading>Hallo!</Alert.Heading>
   <p>
     Leider kann aktuell kein Videobild angezeigt werden. Das Auto kannst du über die Buttons unten
     oder mit den Tasten W, A, S, D steuern.
   </p>
   <hr />
   <div className="d-flex justify-content-end">
     <Button onClick={this.handleShow} variant="outline-success">
       Verstanden!
     </Button>
   </div>
 </Alert>
  <Image src="../static/fakecam.jpg"></Image>
     </div>
    )
  }
}

export default Video
