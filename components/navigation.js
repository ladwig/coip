import { Navbar, DropdownButton, Dropdown } from "react-bootstrap";
import { Component } from "react";
import Router from "next/router";
import Head from "next/head";

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  async logout() {
    try {
      const response = await fetch("/api/auth?type=delete-token");
      const content = await response.json();

      if (response.status === 200) {
        document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        Router.push("/login");
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <img
            src="../static/carpic.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="CarOverIP"
          />
        </Navbar.Brand>
        <Navbar.Brand href="index">CarOverIP</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {this.props.loggedIn ? (
              <DropdownButton
                alignRight
                id="dropdown-menu-align-right"
                variant="secondary"
                title={this.props.user}
              >
                <Dropdown.Item href="index">Startseite</Dropdown.Item>
                <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
              </DropdownButton>
            ) : null}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
