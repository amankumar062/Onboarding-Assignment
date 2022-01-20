const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUserName = (email) => {
    return email.split("@")[0];
};

exports.hasIt = async (password) => {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};

exports.createToken = (userName, email, password) => {
    const data = { userName, email, password };
    return jwt.sign(data, process.env.SECRET);
};

exports.storeToken = (userName, email, password, res) => {
    const data = { userName, email, password };
    const token = jwt.sign(data, process.env.SECRET);
    res.cookie("auth_token", token, { httpOnly: true });
};

exports.verifyToken = (myToken) => {
    const decoded = jwt.verify(myToken, process.env.SECRET);
    return decoded.userName;
};
