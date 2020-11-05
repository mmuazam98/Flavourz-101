const express = require("express");
const app = express();
const fs = require("fs");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("shops", { page: "shops" });
});
app.get("/menu", (req, res) => {
  res.render("menu", { page: "menu" });
});
app.get("/orders", (req, res) => {
  res.render("orders", { page: "orders" });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, function () {
  console.log("Server has started successfully at localhost:5000");
});
