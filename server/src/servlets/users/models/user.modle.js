const db = require("../../../db");
const { createToken, storeToken } = require("../utils/users.helpers");

const logInUser = (result, id, token, res) => {
    console.log("User Loggend In");
    storeToken(token, res);
    result["id"] = id;
    res.send(result);
};

const newUser = (id, userName, email, password, res) => {
    const token = createToken(id, userName, email, password);
    let query =
        "INSERT INTO USERS (id, username, email, password, token) VALUES (?, ?, ?, ?, ?)";

    return new Promise((resolve, reject) => {
        db.query(
            query,
            [id, userName, email, password, token],
            (err, result) => {
                if (err) return reject(err);
                else {
                    id == 1
                        ? console.log("First User Created")
                        : console.log("New User Created");
                    logInUser(result, id, token, res);
                    return resolve(result);
                }
            }
        );
    });
};

const findUserId = (email) => {
    let query = "SELECT id AS userId from USERS WHERE email = ?";

    return new Promise((resolve, reject) => {
        db.query(query, [email], (err, result) => {
            if (err) return reject(err);
            else {
                return resolve(result[0].userId);
            }
        });
    });
};

const getNewId = () => {
    let query = "SELECT id AS userId FROM USERS ORDER BY id DESC LIMIT 1";

    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) return reject(err);
            else return resolve(result[0].userId + 1);
        });
    });
};

exports.createUser = (userName, email, password, res) => {
    let id = 1;
    let query = "SELECT COUNT(*) AS userCount FROM USERS";

    db.query(query, async (err, result) => {
        try {
            if (err) console.log(err);
            else if (result[0].userCount === 0) {
                await newUser(1, userName, email, password, res);
            } else {
                query = "SELECT email FROM USERS WHERE email = ?";

                db.query(query, [email], async (err, result) => {
                    if (err) console.log(err);
                    if (result.length == 0) {
                        id = await getNewId();
                        await newUser(id, userName, email, password, res);
                    } else {
                        id = await findUserId(email);
                        const token = createToken(
                            id,
                            userName,
                            email,
                            password
                        );
                        query = "UPDATE USERS SET token = ? WHERE email = ?";
                        db.query(query, [token, email], (err, result) =>
                            err
                                ? console.log(err)
                                : logInUser(result, id, token, res)
                        );
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    });
};

exports.logoutUser = (userId, res) => {
    let query = "UPDATE USERS SET token = NULL WHERE id = ?";
    db.query(query, [userId], (err, result) => {
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
