const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use("/", routes);

app.set("port", 8080);
const server = app.listen(app.get("port"), () => {
    console.log(`Express running: PORT ${server.address().port}`);
});
