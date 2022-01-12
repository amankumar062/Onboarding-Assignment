import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Table from "./Table";
import "../style/App.sass";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Table />} />
                <Route exact path="/Login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
