const db = require("../../../db");

exports.createUser = (userName, email, password, loginStatus) => {
    let query = "SELECT username FROM USERS WHERE username = ?";
    db.query(query, [userName], (err, result) => {
        if (result.length == 0) {
            let newQuery =
                "INSERT INTO USERS (username, email, password, logged_in) VALUES (?, ?, ?, ?)";

            db.query(
                newQuery,
                [userName, email, password, loginStatus],
                (err, result) =>
                    err ? console.log(err) : console.log("New User Created")
            );
        } else {
            let newQuery = "UPDATE USERS SET logged_in = ? WHERE username = ?";

            db.query(newQuery, [loginStatus, userName], (err, result) =>
                err ? console.log(err) : console.log("User Logged In")
            );
        }
    });
};

exports.logoutUser = (username) => {
    let query = "UPDATE USERS SET logged_in = '0' WHERE username = ?";
    db.query(query, [username], (err, result) =>
        err ? console.log(err) : console.log("Logged Out!")
    );
};

exports.checkLoggedIn = (userName, next) => {
    let query = "SELECT logged_in FROM USERS WHERE username = ?";
    db.query(query, [userName], (err, result) => {
        if (result[0].logged_in == 1) next();
    });
};
