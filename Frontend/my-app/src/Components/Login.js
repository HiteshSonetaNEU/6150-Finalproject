import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../Styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/", {
          withCredentials: true,
        });
        if (response.data.name) {
          // user is logged in
          navigate("/home");
        }
      } catch (error) {
        // user is not logged in
        if (error.response.data.message === "Login first") {
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    checkLoggedInStatus();
  }, [navigate]);

  useEffect(() => {
    setIsLoginDisabled(
      !email || !password || emailErrorMessage || passwordErrorMessage
    );
  }, [email, password, emailErrorMessage, passwordErrorMessage]);

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

  const validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@northeastern\.edu$/;

    if (!emailRegex.test(input)) {
      setEmailErrorMessage("Enter valid northeastern email ID");
    } else {
      setEmailErrorMessage("");
    }
  };

  const validatePassword = (input) => {
    if (input.length < 8) {
      setPasswordErrorMessage("Invalid Password, Minimum 8 Characters");
    } else {
      setPasswordErrorMessage("");
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();

    validateEmail(email);
    validatePassword(password);

    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response) {
        if (response.data.message === "Logged in successfully") {
          navigate("/home");
        }
      }
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("Invalid User Id or Password");
      } else if (error.response.status === 400) {
        setErrorMessage("Log Out First");
      } else if (error.response.status === 500) {
        setErrorMessage("Internal Server Error");
      } else {
        setErrorMessage(
          error.response.data.error || "Network Error! Check Connection!"
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin(e);
  };

  const navigateToRegister = () => {
    navigate("/register");
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
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
              />
              <label htmlFor="floatingInput">Email address</label>
              {emailErrorMessage && (
                <div className="alert alert-danger alert-small" role="alert">
                  {emailErrorMessage}
                </div>
              )}
            </div>

            <div className="form-floating mb-3 login-container-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
              />
              <label htmlFor="floatingPassword">Password</label>
              {passwordErrorMessage && (
                <div className="alert alert-danger alert-small" role="alert">
                  {passwordErrorMessage}
                </div>
              )}
            </div>

            <div className="form-floating mb-3 login-container-3">
              <button
                type="submit"
                className="btn btn-success login-container-3-submit-btn"
                disabled={isLoginDisabled}
              >
                Login
              </button>
            </div>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="form-floating mb-3 login-container-4">
              <p className="texts">Become a member</p>
              <button
                type="button"
                className="btn btn-primary login-container-4-register-btn"
                onClick={navigateToRegister}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
