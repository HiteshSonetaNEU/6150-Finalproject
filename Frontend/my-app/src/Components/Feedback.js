import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../Styles/Feedback.css";

import Header from "./Header.js";
import Footer from "./Footer.js";

function Feedback() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const updateRating = (value) => {
    setRating(value);
  };

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
      <Header />
      <form className="row g-3 feedbackForm" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <label htmlFor="inputFullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputFullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Street, Apartment, etc."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputZip" className="form-label">
            Zip
          </label>
          <input
            type="text"
            className="form-control"
            id="inputZip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="customRange3" className="form-label">
            Rate your experience
          </label>
          <div className="d-flex align-items-center">
            <input
              type="range"
              className="form-range flex-grow-1"
              min="0"
              max="10"
              step="1"
              id="customRange3"
              value={rating}
              onChange={(e) => updateRating(e.target.value)}
            />
            <span className="ms-2">{rating}</span>
          </div>
        </div>

        <div className="col-12">
          <label className="form-label">
            Share your comments on our recipes
          </label>
          <textarea
            className="form-control"
            aria-label="With textarea"
            id="myFeedbackComments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-dark" type="submit">
            Submit
          </button>
        </div>

        {/* ... (rest of the form elements) */}
      </form>
    </>
  );
}

export default Feedback;
