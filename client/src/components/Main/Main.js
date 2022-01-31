import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../utlis/user.api";
import LoadingIcon from "../Loading/LoadingIcon/LoadingIcon";

import Table from "../Table/Table";
import "./Main.sass";

export default function Main({ user, setCurrentUser }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [progress, setProgress] = useState(false);

    useEffect(() => checkIsLoggedIn());

    const checkIsLoggedIn = async () => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser !== null) {
            setLoggedIn(true);
            setCurrentUser(currentUser);
        }
        if (currentUser === null) setCurrentUser(-1);
    };

    const logout = async () => {
        setProgress(true);

        const status = await logoutUser(user);

        if (status === 200) {
            localStorage.removeItem("currentUser");
            setCurrentUser(-1);
            setLoggedIn(false);
            setProgress(false);
            checkIsLoggedIn();
        }
    };

    const Login_Logout_Btn = () => {
        if (loggedIn) {
            if (progress) {
                return (
                    <button data-tesid="logoutBtn" className="logoutBtn">
                        <LoadingIcon color="white" />
                    </button>
                );
            }
            return (
                <button
                    data-tesid="logoutBtn"
                    className="logoutBtn"
                    onClick={logout}
                >
                    Logout
                </button>
            );
        }
        return (
            <Link data-tesid="loginBtn" className="loginBtn" to="/login">
                Login
            </Link>
        );
    };

    return (
        <div className="main" data-testid="mainComponent">
            <div className="header" data-testid="header">
                <h1> Product Details</h1>
                {Login_Logout_Btn()}
            </div>

            <Table loggedIn={loggedIn} user={user} />
        </div>
    );
}
