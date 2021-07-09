const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  Email: String,
  ApprovalStatus: Boolean,
});
//creating model
const Model = mongoose.model("Emails", schema);

app.get("/getEmails", async (req, res) => {
  console.log("came");
  try {
    const result = await Model.find();
    res.send(result);
  } catch (e) {
    res.send("promise rejected");
  }
});
app.post("/addEmail", async (req, res) => {
  const data = new Model({
    Email: req.body.Email,
    ApprovalStatus: req.body.ApprovalStatus,
  });
  //joi validation
  console.log(req.body);
  const { error } = validate(req.body);
  console.log(error);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //mongoose schema validation
  try {
    const EmailSaved = await data.save();
    res.send(EmailSaved);
    console.log("request came");
  } catch (e) {
    res.send("promise rejected");
  }
});
// app.post("/delete", async (req, res) => {
//   const find = await Model.findOneAndDelete(req.body._id);
//   res.send("movie removed");
//   //Model.remove();
// });
function validate(data) {
  const schema = {
    Email: Joi.string().min(3).required(),
    ApprovalStatus: Joi.boolean().required(),
  };

  return Joi.validate(data, schema);
}
module.exports = app;
