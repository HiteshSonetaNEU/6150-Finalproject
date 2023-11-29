import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../Styles/Login.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [role, setUserType] = useState("User");
  const [fullName, setFullName] = useState("");
  const [fullNameErrorMessage, setFullNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");
  const [roleErrorMessage, setRoleErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isRegisterDisabled, setIsRegisterDisabled] = useState(true);

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
    setIsRegisterDisabled(
      emailErrorMessage ||
        fullNameErrorMessage ||
        passwordErrorMessage ||
        confirmPasswordErrorMessage ||
        !email ||
        !password ||
        !fullName ||
        !confPassword ||
        !validateConfirmPassword()
    );
  }, [
    emailErrorMessage,
    fullNameErrorMessage,
    passwordErrorMessage,
    confirmPasswordErrorMessage,
    email,
    password,
    fullName,
    confPassword,
  ]);

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

  const validateFullName = (input) => {
    const nameRegex = /^[a-zA-Z_ ]{3,}$/;
    if (!nameRegex.test(input)) {
      setFullNameErrorMessage(
        "Enter valid full name with minimum of three characters"
      );
      return false;
    } else {
      setFullNameErrorMessage("");
      return true;
    }
  };

  const validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@northeastern\.edu$/;

    if (!emailRegex.test(input)) {
      setEmailErrorMessage("Enter valid northeastern email ID");
      return false;
    } else {
      setEmailErrorMessage("");
      return true;
    }
  };

  const validatePassword = (input) => {
    if (input.length < 8) {
      setPasswordErrorMessage("Invalid Password, Minimum 8 Characters");
      return false;
    } else {
      setPasswordErrorMessage("");
      return true;
    }
  };

  const validateConfirmPassword = (input) => {
    if (
      document.getElementById("floatingPassword").value !==
      document.getElementById("floatingCPassword").value
    ) {
      setConfirmPasswordErrorMessage("Password does not match!");
      return false;
    } else {
      setConfirmPasswordErrorMessage("");
      return true;
    }
  };

  const validateRole = (input) => {
    if (
      !(
        document.getElementById("radioUser").checked ||
        document.getElementById("radioChef").checked ||
        document.getElementById("radioAdmin").checked
      )
    ) {
      setRoleErrorMessage("Please Select your Role");
      return false;
    } else {
      setRoleErrorMessage("");
      return true;
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();

    // console.log(fullName);
    // console.log(email);
    // console.log(password);
    // console.log(confPassword);
    // console.log(role);

    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        {
          fullName,
          email,
          password,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response) {
        // console.log(response);
        if (response.data.message === "User created successfully") {
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
      // console.log(error.response.data.message);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else if (error.response.status === 500) {
        // console.log(error.response);
        setErrorMessage("Internal Server Error");
      } else {
        setErrorMessage(error.response.data.error || "Unknown error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateRole()) {
      onRegister(e);
    }
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
              <p className="loginName">REGISTER</p>
            </div>
            <div className="form-floating mb-3 is-invalid login-container-1">
              <input
                type="text"
                className="form-control"
                id="floatingFullName"
                placeholder="name@example.com"
                onChange={(e) => {
                  setFullName(e.target.value);
                  validateFullName(e.target.value);
                }}
              />
              <label htmlFor="floatingFullName">Full Name</label>
              {fullNameErrorMessage && (
                <div className="alert alert-danger alert-small" role="alert">
                  {fullNameErrorMessage}
                </div>
              )}
            </div>
            <div className="form-floating mb-3 is-invalid login-container-1">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
              />
              <label htmlFor="floatingEmail">Email address</label>
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
                  validateConfirmPassword();
                }}
              />
              <label htmlFor="floatingPassword">Password</label>
              {passwordErrorMessage && (
                <div className="alert alert-danger alert-small" role="alert">
                  {passwordErrorMessage}
                </div>
              )}
            </div>

            <div className="form-floating mb-3 login-container-2">
              <input
                type="password"
                className="form-control"
                id="floatingCPassword"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateConfirmPassword();
                }}
              />
              <label htmlFor="floatingCPassword">Confirm Password</label>
              {confirmPasswordErrorMessage && (
                <div className="alert alert-danger alert-small" role="alert">
                  {confirmPasswordErrorMessage}
                </div>
              )}
            </div>
            <div className="radioContainer">
              <div className="form-check  login-container-radio-1">
                <input
                  type="radio"
                  className="form-check-input"
                  id="radioUser"
                  name="userType"
                  value="user"
                  defaultChecked
                  onClick={() => setUserType("User")}
                />
                <label className="form-check-label" htmlFor="radioUser">
                  User
                </label>
              </div>

              <div className="form-check login-container-radio-2">
                <input
                  type="radio"
                  className="form-check-input"
                  id="radioChef"
                  name="userType"
                  value="chef"
                  onClick={() => setUserType("Chef")}
                />
                <label className="form-check-label" htmlFor="radioChef">
                  Chef
                </label>
              </div>

              <div className="form-check login-container-radio-3">
                <input
                  type="radio"
                  className="form-check-input"
                  id="radioAdmin"
                  name="userType"
                  value="admin"
                  onClick={() => setUserType("Admin")}
                />
                <label className="form-check-label" htmlFor="radioAdmin">
                  Admin
                </label>
              </div>
            </div>
            {roleErrorMessage && (
              <div className="alert alert-danger alert-small" role="alert">
                {roleErrorMessage}
              </div>
            )}

            <div className="form-floating mb-3 login-container-3">
              <button
                type="submit"
                className="btn btn-success login-container-3-submit-btn"
                disabled={isRegisterDisabled}
              >
                Register
              </button>
            </div>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
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
