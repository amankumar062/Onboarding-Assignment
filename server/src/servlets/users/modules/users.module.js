const {
    createUserName,
    hasIt,
    verifyToken,
} = require("../utils/users.helpers");
const dbQuery = require("../models/user.modle");

exports.logoutUser = async (req, res) => {
    res.clearCookie("auth_token");
    await dbQuery.logoutUser(req.body.username, res);
};

exports.checkLoggedIn = async (req, res, next) => {
    const { auth_token } = req.cookies;
    const { user } = req.body;
    if (user == verifyToken(auth_token))
        await dbQuery.checkLoggedIn(user, auth_token, next);
    else return;
};

exports.createUser = async (req, res) => {
    let { email, password } = req.body.userData;
    const userName = createUserName(email);
    password = await hasIt(password);
    await dbQuery.createUser(userName, email, password, res);
};
