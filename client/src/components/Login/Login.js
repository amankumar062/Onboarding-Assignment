import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { createUser } from "../../utlis/user.api";
import "./Login.sass";

export default function Login({ setuser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState();
    const [loggedIn, setLoggedIn] = useState(false);
    const [passwordError, setPasswordError] = useState();

    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        currentUser === null ? setLoggedIn(false) : setLoggedIn(true);
    }, []);

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
        if (validateEmail() && validatePassword()) await loginNow();
    };

    const loginNow = async () => {
        const userData = { email: username, password, loginStatus: 1 };
        const convetedUsername = userData.email.split("@")[0];
        localStorage.setItem("currentUser", convetedUsername);
        await setuser(convetedUsername);
        await createUser(userData);
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
        <div className="login" data-testid="loginComponent">
            <div className="login-box">
                <img src="https://i.imgur.com/PaswVCY.jpg" alt="smartserv" />
                {loginForm()}
            </div>
        </div>
    );
}
