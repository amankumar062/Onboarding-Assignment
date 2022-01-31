import Axios from "axios";
const endpoint = process.env.REACT_APP_ENDPOINT;

export const updateRow = async (myData, update, user) => {
    try {
        if (update) {
            const response = await Axios.put(
                `${endpoint}/update`,
                { myData, user },
                {
                    method: "PUT",
                    withCredentials: true,
                }
            );
            return response;
        } else {
            const response = await Axios.post(
                `${endpoint}/create`,
                { myData, user },
                {
                    method: "POST",
                    withCredentials: true,
                }
            );
            return response;
        }
    } catch (error) {
        console.error("Update Row Error: ", error);
    }
};

export const fetchTable = async () => {
    try {
        const responnse = await Axios.get(`${endpoint}/read`);
        return responnse.data;
    } catch (error) {
        console.error("fetchTable Error: ", error);
    }
};

export const deleteRow = async (id, user) => {
    try {
        // const response = await Axios.delete(`${endpoint}/delete/${id}`);
        const response = await Axios.put(
            `${endpoint}/delete`,
            { id, user },
            {
                method: "PUT",
                withCredentials: true,
            }
        );

        return response;
    } catch (error) {
        console.error("Delete Error: ", error);
    }
};
