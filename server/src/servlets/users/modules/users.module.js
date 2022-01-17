const { createUserName, hasIt } = require("../utils/users.helpers");
const dbQuery = require("../models/user.modle");

exports.createUser = async (req, res) => {
    let { email, password } = req.body.userData;
    const userName = createUserName(email);
    password = await hasIt(password);
    dbQuery.createUser(userName, email, password)
    // console.log("Created User: ", email, userName, password);
};
