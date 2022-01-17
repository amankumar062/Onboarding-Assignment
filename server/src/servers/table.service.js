const express = require("express");
const table = express.Router();
const tableModule = require("../servlets/table/modules/table.module");
const { catchErrors } = require("../handlers/errorHandlers");

table.get("/", catchErrors(tableModule.tableData));
table.post("/create", tableModule.createTableData);
table.get("/read", tableModule.readTableData);
table.put("/update", tableModule.updateTableData);
// table.delete("/delete/:id", tableModule.deleteTableData);
table.put("/delete", tableModule.deleteTableData);

module.exports = table;
