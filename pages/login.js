import { Component } from 'react'
import { Container, Form, Card, Button } from 'react-bootstrap'
import Head from 'next/head'
import Cookies from 'next-cookies'
import Router from 'next/router'
import Header from '../components/header'
import Navigation from '../components/navigation'

const fetch = require('isomorphic-fetch')
const serverUrl = process.env.NOW_REGION === 'dev1' ? 'http://localhost:3000' : 'https://car-over-ip.now.sh';

class Login extends Component {
  constructor(props) {
     super(props);
     this.state = {
       user: "",
       password: "",
       optionName: "",
       errorMsg: "",
     };
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   //Ändert/Handelt den State je nach Eingabe --> value={this.state.VALUE}
   handleChange(e) {
     this.setState({
       [e.target.name]: e.target.value
     })
   }

   //Wird beim klicken des Submit-Buttons ausgeführt
   handleSubmit(event) {
      event.preventDefault();
      this.sendLogin()
    }

  //Gibt Login an Backend weiter, wenn positive response = setzt Cookie mit token für User,
  //und leitet User main weiter. Falls nicht wird State inkl. Fehlercode gesetzt
  async sendLogin() {
    try {
      const response = await fetch('/api/auth?type=issue-token', {
        headers: {
          Authorization:  'Basic ' + this.state.user + ':' + this.state.password,
          Name: this.state.optionName
        }
      });
      const content = await response.json()
      if (!content.token) {
        this.setState({errorMsg: "Falsche k-Nummer oder Passwort! Fehler: " + content.status})
        return
      }
     document.cookie = 'token=' + content.token + ' ;SameSite=Strict; Max-Age=3600'
     location.reload()

   }
   catch(e) {
     this.setState({errorMsg: "Es ist ein Fehler aufgetreten. Versuchen Sie es später erneut. "})
     console.log(e);
   }
 }

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
        if (res) {
          res.writeHead(302, {
            Location: '/main'
          })
          res.end()
        }
        else {
          Router.push('/main')
        }

            return { loggedIn: false }

      }
    }
    catch(e) {
      console.log(e)
    }
    return {loggedIn: false}

  }

   render() {
      console.log(this.state.optionName)
    if(!this.props.loggedIn) {
      return (
        <div>
          <Header/>
          <Head>
            <title>CarOverIP - Login</title>
          </Head>
          <Navigation allowed={this.props.loggedIn}/>
          <Container>
          <Card className="login isResponsive">
            <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>K-Nummer<span className="requiredInput"> *</span></Form.Label>
                <Form.Control name="user" type="text" placeholder="k510432" value={this.state.user} onChange={this.handleChange} required/>
                <Form.Text className="text-danger">
                  {this.state.errorMsg}
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Passwort<span className="requiredInput"> *</span></Form.Label>
                <Form.Control name="password" type="password" placeholder="•••••••" value={this.state.password} onChange={this.handleChange} required/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Name <small> (optional)</small></Form.Label>
                <Form.Control name="optionName" type="text" placeholder="Heinz Gaul" value={this.state.optionName} onChange={this.handleChange}/>
              </Form.Group>
              <Button variant="warning" type="submit">Login</Button>
          </Form>
          </Card.Body>
        </Card>
        <style jsx global>{`
            .login {
              margin: auto;
              top: 0; left: 0; bottom: 0; right: 0;
              margin-top: 22vh;
            }
            .login.isResponsive {
              min-width: 200px;
              max-width: 400px;
            }

            .btn-warning {
              width: 100%;
            }

            .requiredInput {
              color: #ffc107;
            }
         `}</style>
          </Container>
        </div>
      )
    }
    else {
      return (<div><Header/>not logged in</div>)
    }
  }
}

export default Login;
