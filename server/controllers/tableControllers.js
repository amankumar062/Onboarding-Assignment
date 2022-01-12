const fetch = require("node-fetch");
const mysql = require("mysql");
let allData = [];

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "product",
});

fetch("https://s3.amazonaws.com/open-to-cors/assignment.json")
    .then((blob) => blob.json())
    .then((data) => {
        let obj = data.products;
        for (const key in obj) {
            let tempArr = new Array();
            tempArr.push(parseInt(key));
            for (const k in obj[key]) {
                k == "price" || k == "popularity"
                    ? tempArr.push(parseInt(obj[key][k]))
                    : tempArr.push(obj[key][k]);
            }
            allData.push(tempArr);
        }
    })
    .then(() => {
        db.connect((err) => {
            if (err) console.log(err);
            else console.log("Connected!");
            db.query("TRUNCATE TABLE productlist", (err, result) => {
                if (err) console.log(err);
                else console.log("Truncated");
            });

            let sql =
                "INSERT INTO productlist (id, subcategory, title, price, popularity) VALUES ?";
            db.query(sql, [allData], (err, result) => {
                if (err) console.log(err);
                else console.log("Insered");
            });
        });
    })
    .catch((err) => console.log(err));

exports.tableData = (req, res) => {
    res.json(allData);
};

exports.getTableData = (req, res) => {
    db.query("SELECT * FROM productlist", (err, result) => {
        err ? console.log(err) : res.send(result);
    });
};
