import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../utlis/user.api";

import Table from "../Table/Table";
import "./Main.sass";

export default function Main({ user, setuser }) {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => checkIsLoggedIn());

    const checkIsLoggedIn = () => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser !== null) {
            setLoggedIn(true);
            setuser(currentUser);
        }
    };

    const logout = async () => {
        localStorage.removeItem("currentUser");
        setuser(-1);
        setLoggedIn(false);
        await logoutUser(user);
        checkIsLoggedIn();
    };

    const Login_Logout_Btn = () => {
        if (loggedIn)
            return (
                <button
                    data-tesid="logoutBtn"
                    className="logoutBtn"
                    onClick={logout}
                >
                    Logout
                </button>
            );
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
