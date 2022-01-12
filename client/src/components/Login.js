import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../style/login.sass";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState();
    const [loggedIn, setLoggedIn] = useState();
    const [passwordError, setPasswordError] = useState(
        "Incorrect Password. Try Again!"
    );

    const validateEmail = () => {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (username.match(mailformat)) setUsernameValid(true);
        else setUsernameValid(false);
    };

    const validatePassword = () => {
        let passformat = /^(?=.*[A-Z])(?=.*[0-9])(?=.*@)[A-z0-9@]*$/;

        if (
            password.match(passformat) &&
            password === process.env.REACT_APP_PASSWORD
        ) {
            localStorage.setItem("token", process.env.REACT_APP_TOKEN);
            setPasswordValid(true);
            setLoggedIn(true);
        } else if (
            password.match(passformat) === null &&
            password !== process.env.REACT_APP_PASSWORD
        ) {
            setPasswordError(
                "Password must contain an uppercase letter a number and special character @"
            );
            setPasswordValid(false);
            setLoggedIn(false);
        } else if (
            password.match(passformat) &&
            password !== process.env.REACT_APP_PASSWORD
        ) {
            setPasswordError("Incorrect Password. Try Again!");
            setPasswordValid(false);
            setLoggedIn(false);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        validateEmail();
        validatePassword();
        if (usernameValid === false || passwordValid === false) return 0;
        if (usernameValid === true && passwordValid === true) console.log(e);
        // if (validateEmail()) console.log(e);
    };

    if (loggedIn === true) return <Navigate to="/dashboard" />;

    return (
        <div className="login">
            <div className="login-box">
                <img src="https://i.imgur.com/PaswVCY.jpg" alt="smartserv" />
                <form onSubmit={onSubmit}>
                    <input
                        autoComplete="off"
                        type="text"
                        placeholder="Username"
                        name="email"
                        required
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setUsernameValid();
                        }}
                    />
                    <span
                        className={
                            usernameValid === false ? "error-active" : "error"
                        }
                    >
                        Invalid Email ID try again!
                    </span>
                    <input
                        className="password-field"
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordValid();
                        }}
                    />
                    <span
                        className={
                            usernameValid === true && passwordValid === false
                                ? "error-active"
                                : "error"
                        }
                    >
                        {passwordError}
                    </span>
                    <button type="submit">Login</button>
                    <a href="mailto:support@smartserv.io?subject=Forgot Password&body=Hi, I have forgotten my smartserv password my id is: {your id} can you please reset my password. Thank you">
                        ForgotPassword
                    </a>
                </form>
            </div>
        </div>
    );
}
