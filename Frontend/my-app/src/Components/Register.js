import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../Styles/Login.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();

    //Comment this when connected with backend
    // navigate("/home");

    try {
      const requestBody = {
        fullName: "{ type: String, required: true }",
        email: email,
        password: password,
        role: "",
        following: "[{ type: mongoose.Schema.Types.ObjectId, ref: refString }]",
      };

      const response = await axios.post(
        "http://localhost:3001/register",
        requestBody
      );

      if (response.statusText === "OK") {
        console.log(response.data.message);
        if (response.data.message === "Login successful") {
          navigate("/home");
        } else if (response.data.message === "Invalid credentials") {
          setErrorMessage("Invalid credentials");
        }
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin(e);
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="login-container">
        <div className="login-container-body">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <p className="loginName">LOGIN</p>
            </div>
            <div className="form-floating mb-3 is-invalid login-container-1">
              <input
                type="text"
                className="form-control"
                id="floatingFullName"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingFullName">Full Name</label>
            </div>
            <div className="form-floating mb-3 is-invalid login-container-1">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingEmail">Email address</label>
            </div>
            <div className="form-floating mb-3 login-container-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-floating mb-3 login-container-2">
              <input
                type="password"
                className="form-control"
                id="floatingCPassword"
                placeholder="Confirm Password"
              />
              <label htmlFor="floatingCPassword">Confirm Password</label>
            </div>
            
            <div className="form-floating mb-3 login-container-3">
              <button
                type="submit"
                className="btn btn-success login-container-3-submit-btn"
              >
                Register
              </button>
            </div>
            {/* Already A user */}
            <div className="form-floating mb-3 login-container-4">
              <p className="texts">Already a User ?</p>
              <button
                type="button"
                className="btn btn-primary login-container-4-register-btn"
                onClick={navigateToLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
