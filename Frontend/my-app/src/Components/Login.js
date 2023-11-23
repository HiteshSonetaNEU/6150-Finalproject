import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../Styles/Login.css"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const onLogin = async (e) => {
        e.preventDefault();
        
        // console.log("CALLED!");
        try {

            const requestBody = {
                email: email,
                password: password,
            };

            const response = await axios.post(
                "http://localhost:3001/users/login",
                requestBody
            );

            // if (response.statusText === "OK") {
            //     console.log(response.data.message);
            //     if (response.data.message === "Login successful") {
            //       navigate("/home");
            //     } else if (response.data.message === "Invalid credentials") {
            //       setErrorMessage("Invalid credentials");
            //     }
            // }

        } catch (error) {
          console.log("error");
        }
    };

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        onLogin(e);
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
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3 login-container-2">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <div className="form-floating mb-3 login-container-3">
                                <button type="submit" className="btn btn-success login-container-3-submit-btn">Login</button>
                            </div>
                            <div className="form-floating mb-3 login-container-4">
                                <p className="texts">Not a user ?</p>
                                <button type="button" className="btn btn-primary login-container-4-register-btn">Register</button>
                            </div>
                        </form>
                    </div>
            </div>
        </>
    );
}

export default Login;