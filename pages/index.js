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
        <Navigation allowed={this.props.loggedIn} user={this.props.user}/>
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
            <Button href="login" variant="warning" className="mainbutton">Login</Button>
          </p>
          </Container>
      </Jumbotron>
      <Container>
        <Row>
            <Col className="line" sm><font size="5" color="Black"><u>Über uns:</u></font>
              <br/> Ismar
              <br/> Andrej
              <br/>Daniel
              <br/>Simon</Col>
            <Col className="line" sm><font size="5" color="Black"><u>Links:</u></font>
              <br/> FHWS
              <br/> Github
              <Dsgvo/>
              <Impress/>
          </Col>
            <Col className="box" sm><font size="5" color="Black"><u>Test:</u></font>
              <br/>Und hier steht noch mehr</Col>
        </Row>
      </Container>
          <style jsx global>{`
            .main {
              background-image: url("../static/bg.jpg");
              background-size: cover;
              background-repeat: no-repeat;
              background-position-y: 55%;
              height: 65vh;
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
