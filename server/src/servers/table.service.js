const express = require("express");
const table = express.Router();
const tableModule = require("../servlets/table/modules/table.module");
const userModule = require("../servlets/users/modules/users.module");
const { catchErrors } = require("../handlers/errorHandlers");

table.get("/", catchErrors(tableModule.tableData));
table.post(
    "/create",
    catchErrors(userModule.checkLoggedIn),
    catchErrors(tableModule.createTableData)
);
table.get("/read", catchErrors(tableModule.readTableData));
table.put(
    "/update",
    catchErrors(userModule.checkLoggedIn),
    catchErrors(tableModule.updateTableData)
);
// table.delete("/delete/:id", tableModule.deleteTableData);
table.put(
    "/delete",
    catchErrors(userModule.checkLoggedIn),
    catchErrors(tableModule.deleteTableData)
);

module.exports = table;
