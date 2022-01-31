import { useState, useEffect, createRef } from "react";
import Product from "../Product/Product";
import { fetchTable } from "../../utlis/table.api";
import { binarySearch } from "../../utlis/helpers";
import Loading from "../Loading/Loading";

export default function Table({ loggedIn, user }) {
    const [tableData, setTableData] = useState([]);
    const [tableHead, setTableHead] = useState([]);
    const [refs, setRefs] = useState([]);
    const [length, setLength] = useState(); // length of tableData
    const [active, setActive] = useState(false);
    const [showData, setShowData] = useState({});
    const [updataData, setUpdateData] = useState();

    useEffect(() => {
        (async () => {
            const data = await fetchTable();
            await setTableData(data);
            await createTableHead(data);
            await setLength(data.length);
        })();
    }, []);

    useEffect(() => {
        setRefs((refs) =>
            Array(length)
                .fill()
                .map((_, i) => refs[i] || createRef())
        );
    }, [length]);

    const isLoggedIn = (type, index) => {
        if (loggedIn && type === "row")
            return (
                <td>
                    <i
                        title="Edit"
                        className="fad fa-pen"
                        onClick={() => updateForm(index)}
                    ></i>
                </td>
            );
        if (loggedIn && type === "head")
            return (
                <th data-testid="loggedInHead">
                    <i
                        onClick={createForm}
                        title="New"
                        className="fal fa-plus-square fa-lg"
                    ></i>
                </th>
            );
    };

    const createForm = () => {
        let obj = {};
        for (let i = 0; i < tableHead.length; i++) obj[tableHead[i]] = "";

        let id = Date.now() / 10000000000;
        while (binarySearch(tableData, parseInt(id)) !== -1)
            id += Math.random() * (Date.now() / 10000000000);

        obj.id = parseInt(id);

        setActive(!active);
        setShowData(obj);
        setUpdateData(false);
        obj = null;
    };

    const updateForm = (index) => {
        setActive(!active);
        let obj = {};
        for (let i = 0; i < tableHead.length; i++)
            obj[tableHead[i]] = refs[index].current.children[i].innerText;
        setShowData(obj);
        setUpdateData(true);
        obj = null;
    };

    const checkLoaded = () => {
        let data = tableData;
        if (data.length) {
            return (
                <table cellPadding="0" cellSpacing="0" border="0">
                    <tbody className="tbody">{createTableRow(data)}</tbody>
                </table>
            );
        } else return <Loading />;
    };

    const createTableHead = (data) => {
        let temp = [];
        for (const key in data[0]) if (key !== "deletedBy") temp.push(key);
        setTableHead(temp);
    };

    const createTableRow = (data) => {
        let tempData = [...data];
        tempData.sort((a, b) => (a.popularity > b.popularity ? 1 : -1));

        return tempData.map(
            (arr, index) =>
                arr.deletedBy === null && (
                    <tr className="tr-data" key={arr.id} ref={refs[index]}>
                        <td>{arr.id}</td>
                        <td>{arr.subcategory}</td>
                        <td>{arr.title}</td>
                        <td>{arr.price}</td>
                        <td>{arr.popularity}</td>
                        {isLoggedIn("row", index)}
                    </tr>
                )
        );
    };

    const createTable = () => (
        <div>
            <div className="tbl-header">
                <table cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                        <tr className="tr-header">
                            {tableHead.map((elm, key) => (
                                <th key={key}>{elm}</th>
                            ))}
                            {tableHead.length ? isLoggedIn("head") : <th></th>}
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="tbl-content">{checkLoaded()}</div>
        </div>
    );

    const product = () => {
        if (tableData.length)
            return (
                <Product
                    status={active}
                    currentStatus={currentStatus}
                    data={showData}
                    update={updataData}
                    user={user}
                />
            );
    };

    const currentStatus = (el) => setActive(el);

    return (
        <div className="table-data" data-testid="tableComponent">
            {createTable()}
            {product()}
        </div>
    );
}
