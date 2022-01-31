import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Main from "../Main/Main";
import Login from "../Login/Login";

import "./App.sass";

export default function App() {
    const [user, setUser] = useState(-1);
    const setCurrentUser = (user) => setUser(user);

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Main user={user} setCurrentUser={setCurrentUser} />} />
                <Route
                    exact
                    path="/login"
                    element={<Login setCurrentUser={setCurrentUser} />}
                />
            </Routes>
        </BrowserRouter>
    );
}
