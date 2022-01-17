const db = require("../../../db");

exports.insertDb = (data) => {
    // console.log(data);
    let query =
        "INSERT IGNORE INTO productlist (id, subcategory, title, price, popularity) VALUES ?";
    db.query(query, [data], (err, result) =>
        err ? console.log(err) : console.log("Data Inserted")
    );
};

exports.createDB = (myData, user) => {
    const [id, subcategory, title, price, popularity] = myData;

    let query =
        "INSERT INTO productlist (id, subcategory, title, price, popularity, createdBy) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
        query,
        [id, subcategory, title, price, popularity, user],
        (err, result) => (err ? console.log(err) : console.log("Created!"))
    );
};

exports.readDb = (res) => {
    // Todo: Remove Limit
    let query =
        "SELECT id,subcategory,title,price,popularity FROM productlist WHERE deletedBy IS NULL LIMIT 500";
    db.query(query, (err, result) =>
        err ? console.log(err) : res.send(result)
    );
};

exports.updateDb = (myData, user) => {
    console.log(user);
    const [id, subcategory, title, price, popularity] = myData;
    let query =
        "UPDATE productlist SET subcategory = ?, title = ?, price = ?, popularity = ?, modifyBy = ? WHERE id = ?";

    db.query(
        query,
        [subcategory, title, price, popularity, user, id],
        (err, result) => (err ? console.log(err) : console.log("Updated!"))
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
