// MONGODB SETUP
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("debug", true);
var url = process.env.DATABASEURL || "mongodb://localhost:27017/Flavourz";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;
// MONGODB SETUP

module.exports.Shop = require("./shops");
module.exports.Menu = require("./menu");
module.exports.Order = require("./orders");
