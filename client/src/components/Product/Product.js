import { useState, useEffect } from "react";
import { updateRow, deleteRow } from "../../utlis/table.api";
import { capitalizeFirstLetter, dataCheck } from "../../utlis/helpers";

import("./Product.sass");

export default function Product({ status, currentStatus, data, update, user }) {
    const [productData, setProductData] = useState(data || {});
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => setProductData(data), [data]);

    const getCurrentUser = () => {
        const currentUser = localStorage.getItem("currentUser");
        return user || currentUser;
    };

    const inputOnChange = (e, key) => {
        setProductData((data) => ({
            ...data,
            [key]: e.target.value,
        }));
    };

    const deleteData = async (e) => {
        // e.preventDefault();
        await deleteRow(productData.id, getCurrentUser());
    };

    const passData = async (e) => {
        if (dataCheck(productData, setErrorMsg) === 1)
            await updateRow(productData, update, getCurrentUser());
        else e.preventDefault();
    };

    const closeForm = () => {
        currentStatus(false);
        setProductData({});
    };

    const createFrom = () => {
        return Object.keys(productData).map((key) => {
            if (key !== "deletedBy") {
                let capital = capitalizeFirstLetter(key);
                return (
                    <div className="form__field" key={key}>
                        <label htmlFor={key}> {capital} </label>
                        {inputFields(key)}
                    </div>
                );
            }
        });
    };

    const inputFields = (key) => {
        if (key === "id") {
            return (
                <input
                    disabled
                    readOnly
                    id="id"
                    type={key}
                    value={productData[key]}
                    important="true"
                />
            );
        }
        return (
            <input
                onChange={(e) => inputOnChange(e, key)}
                type={key}
                value={productData[key]}
            />
        );
    };

    const createButtons = () => {
        if (update === false) {
            return (
                <div className="btns">
                    <button
                        type="submit"
                        className="btn create"
                        onClick={(e) => passData(e)}
                    >
                        Create
                    </button>
                </div>
            );
        }
        return (
            <div className="btns">
                <button
                    type="submit"
                    className="btn delete"
                    onClick={(e) => deleteData(e)}
                >
                    Delete
                </button>
                <button
                    type="submit"
                    className="btn update"
                    onClick={(e) => passData(e)}
                >
                    Update
                </button>
            </div>
        );
    };

    return (
        <div
            className={status ? "editData editData__active" : "editData"}
            data-testid="productComponent"
        >
            <p className="title">
                {update ? "Update Product" : "Create Product"}
            </p>

            <i className="close fas fa-times" onClick={closeForm} />

            <form className="form">
                {createFrom()}
                <div className="error-msg"> {errorMsg} </div>
                {createButtons()}
            </form>
        </div>
    );
}
