import { Container, Button, Col, Row, Image, Form, Card, Jumbotron } from 'react-bootstrap'
import { Component } from 'react'
import Head from 'next/head'
import Header from '../components/header'
import Navigation from '../components/navigation'

class Main extends Component {

   render() {
    return (
      <div>
        <Header/>
          <Head>
            <title>CarOverIP - Let's drive</title>
              </Head>
              <Navigation/>
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
          </Col>
            <Col className="box" sm><font size="5" color="Black"><u>Test:</u></font>
              <br/>Und hier steht noch mehr</Col>
          </Row>
        </Container>
          <style jsx global>{`
            .main {
              background-image: url("../static/bg.jpg");
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
              border: 1;
              border-right: 2px solid #ccc;
              margin: 1em 0;
              padding: 0;
              border-right-color: #1C4179;

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
