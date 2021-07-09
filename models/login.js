const mongoose = require("mongoose");
const express = require("express");
const app = express();
const schema = new mongoose.Schema({
  Email: String,
  Password: String
});
const Model = mongoose.model("logins", schema);

exports.Model = Model;
