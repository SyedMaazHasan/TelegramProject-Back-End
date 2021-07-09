const mongoose = require("mongoose");
const joi = require("joi");
const express = require("express");
const app = express();
//csmco
const schema = new mongoose.Schema({
  //   name: String
  name: {
    type: String,
    required: true,
    enum: ["action", "thriller"]
  }
  // name: {
  //   type: String,
  //   required: true
  //   enum: ['Coffee', 'Tea'],
  // }
});

const Model = mongoose.model("genres", schema);
const data = new Model({
  name: "thriller"
});
async function add() {
  // console.log("under genre");
  try {
    const result = await data.save();
    console.log(result);
  } catch (e) {
    console.log("error occourred in genre : ", e.message);
  }
  //const distinct = Model.find().distinct();
  //console.log("distinct=", distinct);
}
//add();
app.get("/genre", async (req, res) => {
  console.log("under genre");
  const result = await Model.find();
  res.send(result);
  //console.log(result);
});
function validation() {
  const schema = {
    name: joi.string().required()
  };

  return Joi.validate(data, schema);
}
module.exports = app;
