import { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';

class Driver extends Component {
  constructor(props) {
     super(props);
     this.state = {
       loading: false
     };
   }

  handleClick = () => {
  }

  render() {
      return (
        <div>
          <Button variant="warning" onClick={this.handleClick}>Fahrer werden</Button>
        </div>
      )
  }
}

export default Driver
