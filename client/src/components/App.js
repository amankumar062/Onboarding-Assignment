import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "./Main";
import Login from "./Login";

import "../style/App.sass";

function App() {
    const [user, setUser] = useState();

    const currentUser = (user) => setUser(user);

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Main user={user}/>} />
                <Route exact path="/Login" element={<Login user={currentUser} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
