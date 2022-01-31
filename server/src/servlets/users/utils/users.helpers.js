const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.hasIt = async (password) => {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};

exports.createToken = (id, userName, email, password) => {
    const data = { id, userName, email, password };
    return jwt.sign(data, process.env.SECRET, { expiresIn: "1h" });
};

exports.storeToken = (token, res) => {
    res.cookie("auth_token", token, { httpOnly: true });
};
