import { useState, useEffect } from "react";
import Axios from "axios";
import "../style/table.sass";

export default function Table() {
    const [tabledata, setTableData] = useState([]);
    const [tableHead, setTableHead] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8080/get").then((response) => {
            let temp = [];
            setTableData(response.data);
            for (const key in response.data[0]) temp.push(key);

            setTableHead(temp);
            console.log(tableHead);
        });
    }, []);

    return (
        <div className="table-data">
            <h1>Table Data</h1>
            <div className="tbl-header">
                <table cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                        <tr className="tr-header">
                            {tableHead.map((elm) => (
                                <th>{elm}</th>
                            ))}
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="tbl-content">
                <table cellPadding="0" cellSpacing="0" border="0">
                    <tbody className="tbody">
                        {tabledata.map(
                            ({ id, popularity, price, subcategory, title }) => {
                                return (
                                    <tr className="tr-data">
                                        <td>{id}</td>
                                        <td>{popularity}</td>
                                        <td>{price}</td>
                                        <td>{subcategory}</td>
                                        <td>{title}</td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
