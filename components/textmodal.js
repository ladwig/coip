import { Button, Modal } from 'react-bootstrap'
import { Component } from 'react'
import Head from 'next/head'

class Impress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  handleClose() {
    this.setState({
      show: false
    });
  }

render() {
    return (
      <div>
        <a onClick={this.handleShow}>{this.props.linkname}</a>
          <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.props.children}</Modal.Body>
          </Modal>
     </div>
    )
  }
}

export default Impress
