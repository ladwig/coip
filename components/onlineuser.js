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

const serverUrl =  process.env.NOW_REGION === 'dev1' ? 'http://localhost:3000' : 'https://car-over-ip.now.sh';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeUsers: []
    }

    this.fetchActiveUsers = this.fetchActiveUsers.bind(this);
  }

  //Prüft ob token im gesetzen Cookie mit token auf Backendserver übereinstimmt,
  //falls nicht, wird User auf Login verwiesen
  static async getInitialProps({req, res}) {
    try {
      const token = req.headers.cookie.split('=')[1]
      const response = await fetch(serverUrl + '/api/auth?type=verify', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      const content = await response.json()
      if(content.allowed) {
        return {
          loggedIn: true,
           user: content.user
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

  async fetchActiveUsers() {
    try {
      const response = await fetch(serverUrl + '/api/auth?type=list-users');
      const content = await response.json();

      if (response.status === 200) {
        this.setState({
          activeUsers: content
        })
      }
    } catch(e) {
      console.log(e)
    }
  }

  componentDidMount() {
    setTimeout(this.fetchActiveUsers, 6000);
  }

  componentWillUnmount() {
    if (this.activeUserTimeout) {
      clearTimeout(this.activeUserTimeout);
    }
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
              <Col xs={12} sm={10}><Video/>
              <Controls/>
                <Container/>
                  </Col>
              <Col xs={12} sm={2}><Badge variant="light">{this.state.activeUsers.length}</Badge> User online <br/><br/>
              <>{this.state.activeUsers.map(user => {
                return <>{user.optionName || user.username} <Badge variant="light">Watching (1min)</Badge></>
              })}</>
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
