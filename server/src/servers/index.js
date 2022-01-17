const express = require("express");
const router = express.Router();
const table = require("./table.service");
const users = require("./users.service");

router.use("/", table);
router.use("/", users);

module.exports = router;
