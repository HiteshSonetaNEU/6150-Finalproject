import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

import '../Styles/Header.css';

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
    <header className="header-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">reSSSePes</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse show" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/chefs">Chefs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/feedback">Feedback</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact Us</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
              <button className="btn btn-danger logout-btn" type="button" onClick={LogoutButton}>
                  Logout
              </button>
              </form>
          </div>
        </div>
      </nav>
    </header>

      {/* <div className="home-container">
        <Navbar bg="dark" expand="lg" variant="dark" className="navbar">
        <Container>
          <Navbar.Brand href="#home">reSSSePes</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/chefs">
                Chefs
              </Nav.Link>
              <Nav.Link as={Link} to="/feedback">
                Feedback
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact Us
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 col-lg-8 col-md-6"
                aria-label="Search"
              />
              <Button variant="outline-success" className="ms-lg-3">Search</Button>
              <Button
              type="button"
              className="btn btn-danger ms-2 ms-lg-3"
              onClick={LogoutButton}
            >
              Logout
            </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div> */}
  </>
  );
}
