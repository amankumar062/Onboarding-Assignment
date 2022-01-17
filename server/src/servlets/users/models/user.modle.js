const db = require("../../../db");

exports.createUser = (userName, email, password) => {
    let query = "INSERT INTO USERS (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [userName, email, password], (err, result) =>
        err ? console.log(err) : console.log("User Created")
    ); 
};
