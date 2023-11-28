import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Header() {
  return (
    <>
      <div className="home-container">
        <Navbar bg="light" data-bs-theme="light" className="navBar">
          <Container>
            <Navbar.Brand href="#home">reSSSePes</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/chefs">
                Chefs
              </Nav.Link>
              <Nav.Link as={Link} to="/feedback">
                feedback
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact Us
              </Nav.Link>
            </Nav>
          </Container>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar>
        <div className="home-body-container"></div>
      </div>
    </>
  );
}
