import { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import WebSocket from 'isomorphic-ws';

const code = new Uint8Array(1);

let W = false;
let A = false;
let S = false;
let D = false;

let ws = null;

class Controls extends Component {
  constructor(props) {
     super(props);
     this.state = {
       online: false
     };
 }

 componentDidMount = () => {
   window.addEventListener("keyup", this.keyUpHandler) //EventListener für Keyeingabe starten
   window.addEventListener("keydown", this.keyDownHandler) //EventListener für Keyeingabe starten

   if (!ws) {
     ws = new WebSocket('wss://car-over-ip-socket.now.sh');
     ws.binaryType = "arraybuffer";

     ws.onerror = (e) => {
       console.error(e);
       // hier noch timeout für reconnect einbauen!
     }

     ws.onmessage = (data) => {
       if(data.data == 1010) {
         this.setState({
           online: true
         });
         console.log(data.data)
       }
       console.log(data)
     }
   }
   ws.onmessage = (data) => {
     if(data.data == 1010) {
       this.setState({
         online: true
       });
       console.log(data.data)
     }
     console.log(data)
   }
   this.raspiOnline();
 }

  componentWillUnmount = () => {
    window.removeEventListener("keyup", this.keyUpHandler) //EventListener für Keyeingabe beenden
    window.removeEventListener("keydown", this.keyDownHandler) //EventListener für Keyeingabe beenden
  }

  send = () => {
    try {
      ws.send(code.buffer);
    }
    catch(e) {
      console.log(e)
    }
  }

  raspiOnline = () => {
    try {
      ws.send(1010);
    }
    catch(e) {
      console.log(e)
    }
  }

//MouseDown events handeln
  handleMouseDown = (v) => {
    switch (v) {
      case("w"):
        code[0] = 10;
        this.send();
        break
      case("a"):
        code[0] = 40;
        this.send();
        break
      case("s"):
        code[0] = 30;
        this.send();
        break
      case("d"):
        code[0] = 20;
        this.send();
        break
    }
  }

//MouseUp events handeln
  handleMouseUp = (v) => {
    switch (v) {
      case("w"):
        code[0] = 11;
        this.send();
        break
      case("a"):
        code[0] = 41;
        this.send();
        break
      case("s"):
        code[0] = 31;
        this.send();
        break
      case("d"):
        code[0] = 21;
        this.send();
        break
    }
  }

  handleMouseLeave = (v) => {
    switch (v) {
      case("w"):
        code[0] = 11;
        this.send();
        break
      case("a"):
        code[0] = 41;
        this.send();
        break
      case("s"):
        code[0] = 31;
        this.send();
        break
      case("d"):
        code[0] = 21;
        this.send();
        break
    }
  }

//Tastatureingabe auf WASD und Kombinationseingabe prüfen und per WS an Raspi schicken
  keyUpHandler = (e) => {
    switch (e.keyCode) {
      case(87):
        W = false;
        console.log("W")
        code[0] = 11;
        this.send();
        break
      case(65):
        A = false;
        console.log("A")
        code[0] = 41;
        this.send();
          break
      case(83):
        S = false;
        console.log("S")
        code[0] = 31;
        this.send();
        break
      case(68):
        D = false;
        console.log("D")
        code[0] = 21;
        this.send();
        break
      default:
      console.log(e.keyCode)
    }
  }

//Tastatureingabe auf WASD und Kombinationseingabe prüfen und per WS an Raspi schicken
  keyDownHandler = (e) => {
    switch (e.keyCode) {
      case(87):
        if (W) return;
        W = true;
        console.log("W")
        code[0] = 10;
        this.send();
        break
      case(65):
        if (A) return;
        A = true;
        console.log("A")
        code[0] = 40;
        this.send();
        break
      case(83):
        if (S) return;
        S = true;
        console.log("S")
        code[0] = 30;
        this.send();
        break
      case(68):
        if (D) return;
        D = true;
        console.log("D")
        code[0] = 20;
        this.send();
        break
      default:
      console.log(e.keyCode)
    }
  }

  render() {
    if (this.state.online) {
      return (
        <div>
          <div className="goforward" >
            <Button variant="warning" onMouseDown={() => this.handleMouseDown("w")} onMouseUp={() => this.handleMouseUp("w")} onMouseLeave={() => this.handleMouseLeave("w")}>↑</Button>
          </div>
          <div className="lbr">
            <Button variant="warning" onMouseDown={() => this.handleMouseDown("a")} onMouseUp={() => this.handleMouseUp("a")} onMouseLeave={() => this.handleMouseLeave("a")}>←</Button>
          <div className="placeholder">
            <Button variant="disabled">-</Button>
          </div>
            <Button variant="warning" onMouseDown={() => this.handleMouseDown("d")} onMouseUp={() => this.handleMouseUp("d")} onMouseLeave={() => this.handleMouseLeave("d")}>→</Button>
          </div>
            <div className="gobackwards" >
            <Button variant="warning" onMouseDown={() => this.handleMouseDown("s")} onMouseUp={() => this.handleMouseUp("s")} onMouseLeave={() => this.handleMouseLeave("s")}>↓</Button>
          </div>
            <style jsx global>{`

              .goforward {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 5vh;
              }

              .lbr {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 0vh;
              }

              .gobackwards {
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .placeholder {
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 0 !important;
              }
          `}</style>
        </div>
      )
    }
    else {
      return ( <div> <Alert variant="danger">Es konnte keine Verbindung zum Auto herstellt werden. (Keine Verbindung zu ws-Server möglich!)</Alert></div> )
    }
  }
}

export default Controls
