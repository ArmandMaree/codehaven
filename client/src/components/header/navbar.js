// import { Navbar, Nav, Icon } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import React from "react";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Login from '../login'

class BootstrapNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">CodeHaven</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Aquarium Manager" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/aquarium-manager">Status</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/aquarium-manager/control">Control</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/aquarium-manager/log">Log</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/aquarium-manager/devices">Devices</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/aquarium-manager/schedules">Schedules</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Login />
          </Nav>
        </Container>
      </Navbar>
    );
  }
};

export {
  BootstrapNavbar
}