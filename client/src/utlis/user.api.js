import Axios from "axios";
const endpoint = process.env.REACT_APP_ENDPOINT;

export const createUser = async (userData) => {
    try {
        console.log(userData);
        const response = await Axios.post(`${endpoint}/createUser`, {
            userData,
        });
        console.log("CreateUser Response: ", response);
    } catch (error) {
        console.error("CreateUser Error: ", error);
    }
};
