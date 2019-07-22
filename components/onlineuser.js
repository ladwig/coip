import { Component } from 'react'
import { Badge } from 'react-bootstrap'

const fetch = require('isomorphic-fetch')
const WebSocket = require('ws');

const serverUrl =  process.env.NOW_REGION === 'dev1' ? 'http://localhost:3000' : 'https://car-over-ip.now.sh';

class OnlineUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeUsers: []
    }

    this.fetchActiveUsers = this.fetchActiveUsers.bind(this);
  }

  static async fetchActiveUsers() {
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
    setTimeout(this.fetchActiveUsers(), 6000);
  }

  render() {
      return (
        <div>
          <Badge variant="light">{this.state.activeUsers.length}</Badge> User online <br/><br/>
              <>{this.state.activeUsers.map(user => {
                return <>{user.optionName || user.username} <Badge variant="light">Watching (1min)</Badge></>
              })}</>
          <style jsx global>{`
              .container {
                margin-top: 5vh;
              }
           `}</style>
        </div>
      )
  }
}

export default OnlineUser;
