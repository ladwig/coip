import { Container, Button, Form, NavDropdown, FormControl, Col, Row, Nav, Navbar } from 'react-bootstrap'
import { Component } from 'react'
import Head from 'next/head'

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

render() {
    return (
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">
      <img src="../static/carpic.svg" width="30" height="30" className="d-inline-block align-top" alt="CarOverIP"/>
    </Navbar.Brand>
        <Navbar.Brand href="index">CarOverIP</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {this.props.allowed ? <div><small>Angemeldet als</small><a href="login"> {this.props.user}</a> </div>: null}
        </Navbar.Text>
        </Navbar.Collapse>
     </Navbar>
    )
  }
}

export default Navigation
