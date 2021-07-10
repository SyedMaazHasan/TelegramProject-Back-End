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
  //check whether user email is already there
  const check = await Model.find({ Email: req.body.Email }).countDocuments();
  if (check > 0) {
    res.send("This E-mail is already registered");
  } else {
    //mongoose schema validation
    try {
      const EmailSaved = await data.save();
      res.send("Congratulations, your email is now added");
    } catch (e) {
      res.send("promise rejected");
    }
  }
});

function validate(data) {
  const schema = {
    Email: Joi.string().min(3).required(),
    ApprovalStatus: Joi.boolean().required(),
  };

  return Joi.validate(data, schema);
}
module.exports = app;
