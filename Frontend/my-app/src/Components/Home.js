import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import RecipeCard from "./RecipeCard.js";
import "../Styles/Home.css";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/", {
          withCredentials: true,
        });
        if (response.data.name) {
          // user is logged in
        }
      } catch (error) {
        console.log(error);
        // user is not logged in
        if (error.response.data.message === "Login first") {
          navigate("/login");
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    checkLoggedInStatus();
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="home-container">
        <Navbar bg="light" data-bs-theme="light" className="navBar">
          <Container>
            <Navbar.Brand href="#home">reSSSePes</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link to="/Home">Home</Nav.Link>
              <Nav.Link to="./Chefs">Chefs</Nav.Link>
              <Nav.Link to="./Feedback">Pricing</Nav.Link>
              <Nav.Link to="./ContactUs">Contact Us</Nav.Link>
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

export default Home;
