import Axios from "axios";
const endpoint = process.env.REACT_APP_ENDPOINT;

export const updateRow = async (myData, update, user) => {
    try {
        update
            ? await Axios.put(`${endpoint}/update`, { myData, user })
            : await Axios.post(`${endpoint}/create`, { myData, user });
    } catch (error) {
        console.erro("Update Row Error: ", error);
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
        await Axios.put(`${endpoint}/delete`, { id, user });
    } catch (error) {
        console.error("Delete Error: ", error);
    }
};
