import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "@popperjs/core";
import { NavDropdown } from "react-bootstrap";

import "../Styles/Header.css";
import { useState, useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [show, setShow] = useState(false);

  const showDropdown = (e)=>{
      setShow(!show);
  }
  const hideDropdown = e => {
      setShow(false);
  }

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

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

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/", {
          withCredentials: true,
        });
        // console.log(response.data.role);
        setUserRole(response.data.role);
        setUserName(response.data.name);
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
          style={{ width: "4rem", height: "4rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Function to determine if a link should be marked as active
  const isLinkActive = (path) => location.pathname === path;
  // console.log(userRole, userName);


  return (
    <>
      <header className="header-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a
              className="navbar-brand websiteLogo"
              href="/home"
              style={{ display: "flex", alignItems: "center" }}>
              reSSSiPes
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle navigation"
              onClick={toggleCollapse}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="navbar-collapse collapse show"
              id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className={`nav-link 
                      ${isLinkActive("/home") ? "active activePage" : ""}`}
                    href="/home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link 
                      ${isLinkActive("/chefs") ? "active activePage" : ""}`}
                    href="/chefs">
                    Chefs
                  </a>
                </li>
                {(userRole === "Chef" || userRole === "Admin") && (
                  <li className="nav-item">
                    <a
                      className={`nav-link 
                      ${isLinkActive("/recipe") ? "active activePage" : ""}`}
                      href="/recipe">
                      Recipe
                    </a>
                  </li>
                )}
                <li className="nav-item">
                  <a
                    className={`nav-link 
                      ${isLinkActive("/feedback") ? "active activePage" : ""}`}
                    href="/feedback">
                    Feedback
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a className={`nav-link 
                <li className="nav-item">
                  <a
                    className={`nav-link 
                      ${
                        isLinkActive("/editProfile") ? "active activePage" : ""
                      }`}
                    href="/editProfile">
                    Edit Profile
                  </a>
                </li> */}
                <li className="nav-item">
                  <a
                    className={`nav-link 
                      ${isLinkActive("/contact") ? "active activePage" : ""}`}
                    href="/contact">
                    Contact Us
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link 
                      ${isLinkActive("/search") ? "active activePage" : ""}`}
                    href="/search">
                    Search
                  </a>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onInput={onInputChange}
                />
                <button className="btn btn-outline-success" type="submit" onClick={onSearchClicked}>
                  Search
                </button>
              </form>
                    
              <NavDropdown title={`${userRole}: ${userName.length > 1 ? userName.substring(0, userName.indexOf(' ')) : userName}`} id="basic-nav-dropdown" data-bs-theme="dark" className={isDropdownOpen ? 'custom-dropdown open' : 'custom-dropdown'} show={show} onMouseEnter={() => {showDropdown(); handleMouseEnter();}} onMouseLeave={() => {hideDropdown(); handleMouseLeave();}}>
                <NavDropdown.Item href="/editProfile" className="dropDownItem-1">Edit Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={LogoutButton} className="dropDownItem-2">Logout</NavDropdown.Item>

              <NavDropdown
                title={`${userRole}: ${
                  userName.length > 1
                    ? userName.substring(0, userName.indexOf(" "))
                    : userName
                }`}
                id="basic-nav-dropdown">
                <NavDropdown.Item href="#">Action</NavDropdown.Item>
                <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>

              {/* <button
                className="btn btn-danger logout-btn"
                type="button"
                onClick={LogoutButton}>
                Logout
              </button> */}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
