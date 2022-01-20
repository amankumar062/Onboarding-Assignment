const express = require("express");
const app = express();
const cors = require("cors");
const cookieparser = require("cookie-parser");
const routes = require("./src/servers/index");

require("dotenv").config({ path: ".env" });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieparser());
app.use("/", routes);

app.set("port", process.env.PORT || 8080);
const server = app.listen(app.get("port"), () =>
    console.log(`Express running: PORT ${server.address().port}`)
);
