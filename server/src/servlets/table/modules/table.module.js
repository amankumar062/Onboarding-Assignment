const fetch = require("node-fetch");
const dbQuery = require("../models/table.modle");
const { dataSanitizier, dataConverting } = require("../utils/table.helpers");

const url = "https://s3.amazonaws.com/open-to-cors/assignment.json";
let allData = [];

exports.tableData = async (req, res) => {
    try {
        console.log(req.cookies)
        const response = await fetch(url);
        const data = await response.json();
        allData = await dataSanitizier(data);
        await dbQuery.insertDb(allData);
        res.send(allData);
    } catch (error) {
        console.log(error);
    }
};

exports.createTableData = async (req, res) =>
    await dbQuery.createDB(dataConverting(req.body.myData), req.body.user);

exports.readTableData = async (req, res) => await dbQuery.readDb(res);

exports.updateTableData = async (req, res) =>
    await dbQuery.updateDb(dataConverting(req.body.myData), req.body.user);

// exports.deleteTableData = (req, res) => dbQuery.deleteDb(req.params.id, res, req.body.user);
exports.deleteTableData = async (req, res) =>
    await dbQuery.deleteDb(req.body.id, req.body.user, res);
