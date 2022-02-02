import { useState, useEffect } from "react";
import { updateRow, deleteRow } from "../../utlis/table.api";
import { capitalizeFirstLetter, dataCheck } from "../../utlis/helpers";
import LoadingIcon from "../Loading/LoadingIcon/LoadingIcon";

import("./Product.sass");

export default function Product({ status, currentStatus, data, update, user }) {
    const [productData, setProductData] = useState(data || {});
    const [errorMsg, setErrorMsg] = useState("");
    const [updateProgress, setUpdateProgresss] = useState(false);
    const [deleteProgress, setDeleteProgress] = useState(false);

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
        e.preventDefault();
        setDeleteProgress(true);

        const response = await deleteRow(productData.id, getCurrentUser());

        if (response.status === 200) {
            setDeleteProgress(false);
            window.location.reload();
        }

        if (response.data === "Error") localStorage.removeItem("currentUser");
    };

    const passData = async (e) => {
        e.preventDefault();
        if (dataCheck(productData, setErrorMsg) === 1) {
            setUpdateProgresss(true);

            const response = await updateRow(
                productData,
                update,
                getCurrentUser()
            );

            if (response.status === 200) {
                setUpdateProgresss(false);
                window.location.reload();
            }

            if (response.data === "Error"){
                setUpdateProgresss(false);
                localStorage.removeItem("currentUser");
            }
        }
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
                        {!updateProgress ? (
                            "Create"
                        ) : (
                            <LoadingIcon color="white" />
                        )}
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
                    {!deleteProgress ? "Delete" : <LoadingIcon color="white" />}
                </button>
                <button
                    type="submit"
                    className="btn update"
                    onClick={(e) => passData(e)}
                >
                    {!updateProgress ? "Update" : <LoadingIcon color="white" />}
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
