import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Header() {
  const navigate = useNavigate();
  const LogoutButton = async () => {
    try {
      const response = await axios.get("http://localhost:3001/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.message === "Logged out Successfully") {
        navigate("/login");
      }
    } catch (error) {
      if (error.response.data.message === "Login first") {
        navigate("/login");
      }
      // console.error("Error fetching data:", error.response);
    }
  };

  return (
    <>
      <div className="home-container">
        <Navbar
          bg="dark"
          data-bs-theme="dark"
          className="navBar navbar navbar-expand navbar-dark bg-dark"
        >
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
          <Button
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
            onClick={LogoutButton}
          >
            Logout
          </Button>
        </Navbar>
        <div className="home-body-container"></div>
      </div>
    </>
  );
}
