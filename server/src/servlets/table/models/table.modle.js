const db = require("../../../db");
const { currentTime } = require("../utils/table.helpers");

exports.insertDb = (data) => {
    let query =
        "INSERT IGNORE INTO productlist (id, subcategory, title, price, popularity) VALUES ?";
    db.query(query, [data], (err, result) =>
        err ? console.log(err) : console.log("Data Inserted")
    );
};

exports.createDB = (myData, user, res) => {
    const [id, subcategory, title, price, popularity] = myData;

    let query =
        "INSERT INTO productlist (id, subcategory, title, price, popularity, createdBy) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
        query,
        [id, subcategory, title, price, popularity, user],
        (err, result) => {
            if (err) console.log(err);
            else {
                res.send(result);
                console.log("Created!");
            }
        }
    );
};

exports.readDb = (res) => {
    let query =
        "SELECT id,subcategory,title,price,popularity, deletedBy FROM productlist ";
    db.query(query, (err, result) =>
        err ? console.log(err) : res.send(result)
    );
};

exports.updateDb = (myData, user, res) => {
    const time = currentTime();
    const [id, subcategory, title, price, popularity] = myData;
    let query =
        "UPDATE productlist SET subcategory = ?, title = ?, price = ?, popularity = ?, modifyBy = ?, modifyAt = ? WHERE id = ?";

    db.query(
        query,
        [subcategory, title, price, popularity, user, time, id],
        (err, result) => {
            if (err) console.log(err);
            else {
                res.send(result);
                console.log("Updated!");
            }
        }
    );
};

exports.deleteDb = (id, user, res) => {
    // let query = "DELETE FROM productlist WHERE id = ?";
    // db.query(query, id, (err, result) =>
    //     err ? console.log(err) : res.send(result)
    // );

    let query = "UPDATE productlist SET deletedBy = ? WHERE id = ?";
    db.query(query, [user, id], (err, result) =>
        err ? console.log(err) : res.send(result)
    );
};
