import { Container, Button, Col, Row, Image, Form, Card, Jumbotron } from 'react-bootstrap'
import { Component } from 'react'
import Head from 'next/head'
import Header from '../components/header'
import Navigation from '../components/navigation'
import Impress from '../components/impress'
import Dsgvo from '../components/dsgvo'

class Main extends Component {

  static async getInitialProps({req, res}) {
    try {
      const token = req.headers.cookie.split('=')[1]
      const response = await fetch('http://localhost:4000/verify', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      const content = await response.json()
      if(content.allowed) {
        return {
          loggedIn: true,
           user: content.user,
        }
      }
    }
     catch(e) {
      console.log(e)
    }

    return { loggedIn: false }
  }

   render() {
    return (
      <div>
        <Header/>
        <Head>
          <title>CarOverIP - Welcome</title>
        </Head>
        <Navigation loggedIn={this.props.loggedIn} user={this.props.user}/>
        <Jumbotron className="main">
          <Container className="maintext">
          <h1 className="uberschrift">Willkommen!</h1>
          <p>
          <br/>
          <br/>
            Diese Website ist im Rahmen des Softwareentwicklungsprojekts / Programierprojekt der FHWS entstanden.
            <br/>
            Bist du Student / Lehrbeauftragter der FHWS, kannst du dich hier mit deinen Zugangsdaten einloggen und hast
            dann die Möglichkeit das von uns entwickelte Spielzeugauto zu steuern!
            <br/>
            Viel Spaß!
          <br/>
          <br/>
            <Button href="login" variant="warning" className="mainbutton">{this.props.loggedIn ? "Weiter..." : "Login"}</Button>
          </p>
          </Container>
      </Jumbotron>
      <Container>
        <Row>
            <Col className="line" sm><h4>Wer:</h4>
            <ul>
              <li>Ismar Klokic</li>
              <li>Daniel Ladwig</li>
              <li>Andrej Weiß</li>
            </ul>
              </Col>
            <Col className="line" sm><h4>Links:</h4>
            <ul>
              <li><Impress/></li>
              <li><Dsgvo/></li>
            </ul>
          </Col>
            <Col className="box" sm><h4>Was:</h4>
            <ul>
              <li>Raspberry Pi</li>
              <li>JavaScript</li>
              <li>Now / Zeit.co</li>
            </ul>
            </Col>
        </Row>
      </Container>
          <style jsx global>{`
            .main {
              background-image: url("../static/bg.jpg");
              background-size: cover;
              background-repeat: no-repeat;
              background-position-y: 55%;
              height: 100%;
              border-radius: 0px !important;

            }
            .mainbutton {
            width: 80px;
            height: 40px;

            }
            .uberschrift {
            text-align: center;
            color: white;
            font-size: 55px;
            }

            .ul {
              list-style: none;
            }
            .maintext {
              text-align: center;
              color: white;
              font-size: 20px;
            }

            .line {
              display: block;
              border-right: 1px solid #ccc;
              margin: 1em 0;
              padding: 0;

            }
            .box{
              margin: 1em 0;
              padding: 0;
            }
         `}</style>
      </div>

    )
  }
}


export default Main;
