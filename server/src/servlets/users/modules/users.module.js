const { createUserName, hasIt } = require("../utils/users.helpers");
const dbQuery = require("../models/user.modle");

exports.logoutUser = async (req, res) =>
    await dbQuery.logoutUser(req.body.username);

exports.checkLoggedIn = async (req, res, next) =>
    await dbQuery.checkLoggedIn(req.body.user, next);

exports.createUser = async (req, res) => {
    let { email, password, loginStatus } = req.body.userData;
    const userName = createUserName(email);
    password = await hasIt(password);
    await dbQuery.createUser(userName, email, password, loginStatus);
};
