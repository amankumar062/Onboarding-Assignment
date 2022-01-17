import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { createUser } from "../utlis/user.api";

import "../style/login.sass";

export default function Login({ user }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState();
    const [loggedIn, setLoggedIn] = useState(false);
    const [passwordError, setPasswordError] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null) {
            setLoggedIn(false);
        }
        if (token === process.env.REACT_APP_TOKEN) setLoggedIn(true);
    });

    if (loggedIn === true) {
        return <Navigate to="/" />;
    }

    const validateEmail = () => {
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (username.match(mailFormat)) {
            setUsernameValid(true);
            return true;
        } else {
            setUsernameValid(false);
            return false;
        }
    };

    const validatePassword = () => {
        let passwordFormat = /^(?=.*[A-Z])(?=.*[0-9])(?=.*@)[A-z0-9@]*$/;

        if (
            password.match(passwordFormat) &&
            password === process.env.REACT_APP_PASSWORD
        ) {
            localStorage.setItem("token", process.env.REACT_APP_TOKEN);
            setPasswordValid(true);
            setLoggedIn(true);
            return true;
        } else if (
            password.match(passwordFormat) === null &&
            password !== process.env.REACT_APP_PASSWORD
        ) {
            setPasswordError(
                "Password must contain an uppercase letter a number and special character @"
            );
            setPasswordValid(false);
            setLoggedIn(false);
            return false;
        } else if (
            password.match(passwordFormat) &&
            password !== process.env.REACT_APP_PASSWORD
        ) {
            setPasswordError("Incorrect Password. Try Again!");
            setPasswordValid(false);
            setLoggedIn(false);
            return false;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        validateEmail();
        validatePassword();
        if (validateEmail() && validatePassword()) {
            const userData = { email: username, password };
            localStorage.setItem("currentUser", userData.email.split("@")[0]);

            user(userData.email.split("@")[0]);
            console.log(userData.email.split("@")[0]);
            
            await createUser(userData);
        }
    };

    const loginForm = () => {
        return (
            <form onSubmit={onSubmit}>
                <input
                    autoComplete="off"
                    type="text"
                    placeholder="Username"
                    name="email"
                    required
                    onChange={(e) => {
                        setUsername(e.target.value);
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
        );
    };

    return (
        <div className="login">
            <div className="login-box">
                <img src="https://i.imgur.com/PaswVCY.jpg" alt="smartserv" />
                {loginForm()}
            </div>
        </div>
    );
}
