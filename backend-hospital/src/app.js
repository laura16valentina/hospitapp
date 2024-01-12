const express = require("express");
const myconnection = require("express-myconnection");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const loginRoutes = require("./routes/login");

const app = express();

app.set("port", 3000);
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(
  myconnection(mysql, {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "nodelogin",
  })
);

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.listen(app.get("port"), () => {
  console.log("listening on port", app.get("port"));
});

app.use("/", loginRoutes);
