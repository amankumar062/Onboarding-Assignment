const db = require("../../../db");
const { createToken, storeToken } = require("../utils/users.helpers");

exports.createUser = (userName, email, password, res) => {
    const token = createToken(userName, email, password);
    let query = "SELECT username FROM USERS WHERE username = ?";
    db.query(query, [userName], (err, result) => {
        if (result.length == 0) {
            let newQuery =
                "INSERT INTO USERS (username, email, password, token) VALUES (?, ?, ?, ?)";

            db.query(
                newQuery,
                [userName, email, password, token],
                (err, result) => {
                    if (err) console.log(err);
                    else {
                        storeToken(userName, email, password, res);
                        res.send(result);
                        console.log("New User Created");
                    }
                }
            );
        } else {
            let newQuery = "UPDATE USERS SET token = ? WHERE username = ?";
            db.query(newQuery, [token, userName], (err, result) => {
                if (err) console.log(err);
                else {
                    storeToken(userName, email, password, res);
                    res.send(result);
                    console.log("User Loggend In");
                }
            });
        }
    });
};

exports.logoutUser = (username, res) => {
    let query =
        "UPDATE USERS SET token = NULL WHERE username = ?";
    db.query(query, [username], (err, result) => {
        if (err) console.log(err);
        else {
            res.send(result);
            console.log("User Logged Out!");
        }
    });
};

exports.checkLoggedIn = (userName, auth_token, next) => {
    let query = "SELECT token FROM USERS WHERE username = ?";
    db.query(query, [userName], (err, result) => {
        if (result[0].token == auth_token) {
            console.log("all verification done");
            next();
        }
    });
};
