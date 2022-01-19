import Axios from "axios";
const endpoint = process.env.REACT_APP_ENDPOINT;

export const createUser = async (userData) => {
    try {
        await Axios.post(`${endpoint}/createUser`, { userData });
    } catch (error) {
        console.error("CreateUser Error: ", error);
    }
};

export const logoutUser = async (username) => {
    try {
        await Axios.post(`${endpoint}/logoutUser`, { username });
    } catch (error) {
        console.error("loggedIn status: ", error);
    }
};
