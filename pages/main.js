import { Component } from 'react'
import { Container, Button, Col, Row, Badge } from 'react-bootstrap'
import Head from 'next/head'
import Router from 'next/router'
import Cookies from 'next-cookies'
import Navigation from '../components/navigation'
import Header from '../components/header'
import Controls from '../components/controls'
import Video from '../components/video'
import Driver from '../components/driver'

const fetch = require('isomorphic-fetch')
const WebSocket = require('ws');

class Main extends Component {
  constructor(props) {
    super(props);
  }

  //Prüft ob token im gesetzen Cookie mit token auf Backendserver übereinstimmt,
  //falls nicht, wird User auf Login verwiesen
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

    if (res) {
      res.writeHead(302, {
        Location: '/login'
      });
      res.end()
    }
    else {
      Router.push('/login')
    }
    return { loggedIn: false }
  }

   render() {
    if (this.props.loggedIn) {
      return (
        <div>
        <Header/>
        <Head>
          <title>CarOverIP - Let's drive</title>
        </Head>
        <Navigation loggedIn={this.props.loggedIn} user={this.props.user}/>
          <Container className="container">
            <Row>
              <Col xs={12} sm={9}><Video/>
              <Controls/>
                <Container/>
                  </Col>
              <Col xs={12} sm={3}><Badge variant="light">9</Badge> User online <br/><br/>
              Ismar Klokic <Badge variant="dark">Waiting (2min)</Badge><br/>
              Hakan Arda <Badge variant="light">Watching (71min)</Badge><br/>
              Pascal Ott <Badge variant="light">Watching (4min)</Badge><br/>
              Daniel Ladwig <Badge variant="success">Driving (3min)</Badge><br/>
              Peter Braun <Badge variant="light">Watching (1min)</Badge>
              <Driver/>
              </Col>
            </Row>
          </Container>

          <style jsx global>{`
              .container {
                margin-top: 5vh;
              }
           `}</style>
        </div>
      )
    }
    else {
      return (<div><Header/>not allowed</div>)
    }
  }
}

export default Main;
