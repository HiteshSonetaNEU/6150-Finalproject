import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../Styles/Header.css";

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

  const toggleCollapse = () => {
    const navbar = document.getElementById("navbarSupportedContent");
    navbar.classList.toggle("show");
  };

  return (
    <>
      <header className="header-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a
              className="navbar-brand websiteLogo"
              href="/home"
              style={{ display: "flex", alignItems: "center" }}
            >
              RE
              <a>SSS</a>I<a>P</a>ES
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle navigation"
              onClick={toggleCollapse}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="navbar-collapse collapse show"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/home"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/chefs">
                    Chefs
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/recipe">
                    Recipe
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/feedback">
                    Feedback
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/editProfile">
                    Edit Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">
                    Contact Us
                  </a>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
              <button
                className="btn btn-danger logout-btn"
                type="button"
                onClick={LogoutButton}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
