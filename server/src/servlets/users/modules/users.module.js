const { hasIt } = require("../utils/users.helpers");
const dbQuery = require("../models/user.modle");
const jwt = require("jsonwebtoken");

exports.logoutUser = async (req, res) => {
    res.clearCookie("auth_token");
    await dbQuery.logoutUser(req.body.userId, res);
};

exports.checkLoggedIn = async (req, res, next) => {
    const { auth_token } = req.cookies;
    const { user } = req.body;

    jwt.verify(auth_token, process.env.SECRET, function (err, decoded) {
        if(err) if (err.name === "TokenExpiredError") res.send("Error");
        if (decoded?.id === parseInt(user)) next();
    });

    // if (user == verifyToken(auth_token))
    //     await dbQuery.checkLoggedIn(user, auth_token, next);
};

exports.createUser = async (req, res) => {
    let { userName, email, password } = req.body.userData;
    password = await hasIt(password);
    await dbQuery.createUser(userName, email, password, res);
};
