const express = require("express");
const users = express.Router();
const userModule = require("../servlets/users/modules/users.module");
const { catchErrors } = require("../handlers/errorHandlers");

users.post("/createUser", catchErrors(userModule.createUser));
users.post("/logoutUser", catchErrors(userModule.logoutUser));

module.exports = users;
