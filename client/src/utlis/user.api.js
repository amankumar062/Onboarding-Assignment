import Axios from "axios";
const endpoint = process.env.REACT_APP_ENDPOINT;

export const createUser = async (userData) => {
    try {
        const response = await Axios.post(
            `${endpoint}/createUser`,
            { userData },
            {
                method: "POST",
                withCredentials: true,
            }
        );
        return response
    } catch (error) {
        console.error("CreateUser Error: ", error);
    }
};

export const logoutUser = async (userId) => {
    try {
        const response = await Axios.post(
            `${endpoint}/logoutUser`,
            { userId },
            {
                method: "POST",
                withCredentials: true,
            }
        );
        return response.status;
    } catch (error) {
        console.error("logoutUser status: ", error);
    }
};
