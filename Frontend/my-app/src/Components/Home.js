import React from "react";
import { useState } from "react";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../Styles/Home.css'

function Home() {

    const [data, setData] = useState([]);


    console.log(data);

    return (
        <>
        <div className="home-container">
            <Navbar bg="light" data-bs-theme="light"  className="navBar">
                <Container>
                <Navbar.Brand href="#home">reSSSePes</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link to='/Home'>Home</Nav.Link>
                    <Nav.Link to='./Chefs'>Chefs</Nav.Link>
                    <Nav.Link to='./Feedback'>Pricing</Nav.Link>
                    <Nav.Link to='./ContactUs'>Contact Us</Nav.Link>
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
            <div className="home-body-container">
                
            </div>
        </div>
        </>
    );
}

export default Home;