import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { createUser } from "../../utlis/user.api";
import LoadingIcon from "../Loading/LoadingIcon/LoadingIcon";
import "./Login.sass";

export default function Login({ setCurrentUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState();
    const [loggedIn, setLoggedIn] = useState(false);
    const [passwordError, setPasswordError] = useState();
    const [progress, setProgress] = useState(false);

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
            return true;
        } else if (
            password.match(passwordFormat) === null &&
            password !== process.env.REACT_APP_PASSWORD
        ) {
            passwordFail(
                "Password must contain an uppercase letter a number and special character @"
            );
        } else if (
            password.match(passwordFormat) &&
            password !== process.env.REACT_APP_PASSWORD
        ) {
            passwordFail("Incorrect Password. Try Again!");
        }
    };

    const passwordFail = (error) => {
        // setProgress(!progress);
        setPasswordError(error);
        setPasswordValid(false);
        setLoggedIn(false);
        return false;
    };

    const onSubmit = async (e) => {
        setProgress(true);
        e.preventDefault();
        let emailValid = validateEmail();
        let passwordValid = validatePassword();

        if (emailValid && passwordValid) await loginNow();
        if (!emailValid || !passwordValid) setProgress(false);
    };

    const loginNow = async () => {
        const userData = {
            userName: username.split("@")[0],
            email: username,
            password,
        };

        const loginResponse = await createUser(userData);
        if (loginResponse.status === 200) {
            localStorage.setItem("currentUser", loginResponse.data.id);
            setCurrentUser(loginResponse.data.id);
            setLoggedIn(true);
            setProgress(false);
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
                {progress ? (
                    <button type="submit">
                        <LoadingIcon color="white" />
                    </button>
                ) : (
                    <button type="submit">Login</button>
                )}
                <a href="mailto:support@smartserv.io?subject=Forgot Password&body=Hi, I have forgotten my smartserv password my id is: {your id} can you please reset my password. Thank you">
                    ForgotPassword
                </a>
            </form>
        );
    };

    return (
        <div className="login" data-testid="loginComponent">
            <div className="login-box">
                <img src="https://i.imgur.com/6GyYGE7.png" alt="smartserv" />
                {loginForm()}
            </div>
        </div>
    );
}
