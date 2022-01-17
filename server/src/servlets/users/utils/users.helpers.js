const bcrypt = require("bcrypt");

exports.createUserName = (email) => {
    return email.split("@")[0];
};

exports.hasIt = async (password) => {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};
