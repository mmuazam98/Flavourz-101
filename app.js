const express = require("express");
const app = express();
const fs = require("fs");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const flavourzRoute = require("./routes/flavourz");

app.get("/", (req, res) => {
  res.render("index", { page: "index" });
});

app.use("/api/flavourz", flavourzRoute);

let port = process.env.PORT || 5000

app.listen(port, function () {
  console.log(`Server has started successfully at port ${port}`);
});
