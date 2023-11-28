import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../Styles/Home.css";

import Header from "./Header.js";
import Footer from "./Footer.js";

function Contact() {
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
      Contact Page
      <Header />
      <Footer />
    </>
  );
}

export default Contact;
