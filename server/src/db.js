const mysql = require("mysql");
require("dotenv").config({ path: ".env" });

const db = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

db.connect((err) => (err ? console.log(err) : console.log("Connected!")));

module.exports = db;