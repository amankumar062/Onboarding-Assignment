import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import Table from "./Table";
import "../style/table.sass";

export default function Main({ user }) {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => checkIsLoggedIn());

    const checkIsLoggedIn = () => {
        const token = localStorage.getItem("token");
        if (token === null) setLoggedIn(false);
        if (token === process.env.REACT_APP_TOKEN) setLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        checkIsLoggedIn();
    };

    const AuthBtn = () => {
        if (loggedIn)
            return (
                <button className="logoutBtn" onClick={logout}>
                    Logout
                </button>
            );
        return (
            <Link className="loginBtn" to="/Login">
                Login
            </Link>
        );
    };

    return (
        <div className="main">
            <div className="header">
                <h1> Product Details</h1>
                {AuthBtn()}
            </div>

            <Table loggedIn={loggedIn} user={user} />
        </div>
    );
}
