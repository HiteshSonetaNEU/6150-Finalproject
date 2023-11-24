import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import RecipeCard from "./RecipeCard.js";

import '../Styles/Home.css'

function Home() {

    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/recepie/get', {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              });
            setMessage(response.data);
          } catch (error) {
            console.error('Error fetching data:', error.response);
          }
        };
    
        fetchData();
      }, []);
    
    console.log(message);

    var messageX = [
    {"_id":"655f997390e675518e02e941","ingredients":["Bhindi","Oil","Masala"],"description":"If there’s one classic bhindi (okra) dish with North Indian flavors, it is the Bhindi Masala. This is a semi-dry preparation featuring the star ingredient okra pods (bhindi in Hindi), piquant onions, tangy tomatoes, bold Indian spices and herbs. It is one of the most popular dishes served in almost all restaurants too, of North India. My Bhindi Masala Recipe is an easy and delicious Punjabi style preparation, which is also vegan, gluten-free and quite wholesome.","title":"Bhindi Masala","photo":"google.com","chefID":"655ce2b8b34626526079aa56","__v":0},
    {"_id":"233f997390e675518e02e941","ingredients":["Paneer","Tomatoes","Onions"],"description":"This restaurant style Paneer Tikka Masala recipe is brimming with bright flavors from the spiced and creamy tomato onion curry gravy/sauce and delightfully marinated grilled cottage cheese. While this dish may be considered a labor of love, the time and effort are well worth it! This delicious traditional Punjabi dish is something the whole family will love. Make it for dinner tonight and serve with a pile of naan, roti, or paratha. I can almost guarantee the whole family will clean their plates!","title":"Paneer Tikka Masala","photo":"youtube.com","chefID":"115ce2b8b34626526079aa56","__v":0}
    ];

    var recipeData = [];
    Object.keys(messageX).forEach(function(key) {
        recipeData.push(messageX[key]);
    });

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
                <div className="recipe-card-list">
                    {
                    recipeData.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))
                    }
                </div>
            </div>
        </div>
        </>
    );
}

export default Home;