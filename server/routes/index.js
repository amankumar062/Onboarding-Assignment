const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableControllers");

router.get("/", tableController.tableData);
router.get("/get", tableController.getTableData);

module.exports = router;
