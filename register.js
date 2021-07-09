const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const app = express();
const { Model } = require("./models/login");

app.post("/", async (req, res) => {
  try {
    // validate with joi
    //console.log("one");
    const { error } = validate(req.body);
    if (error) {
      //console.log("two");
      return res.status(400).send(error.details[0].message);
    }
    //console.log("three");
    //check whether user email is already there
    const check = await Model.find({ Email: req.body.Email }).countDocuments();
    //console.log("four", check);
    if (check > 0) {
      //console.log("five");
      res.send("This E-mail is already registered");
    } else {
      //console.log("six");
      //generate the hashed password with salt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.Password, salt);
      //console.log("seven");
      const data = new Model({
        Email: req.body.Email,
        Password: hashedPassword
      });

      //store the email
      const saved = await data.save();
      //console.log("eight");
      res.send(
        "Congratulations, you are now registered.... Please Login to your Account"
      );
    }
  } catch (e) {
    //if above data save thorws promise rejection
    res.send("promise rejected", e);
  }
});

function validate(data) {
  const schema = {
    Email: Joi.string()
      .min(3)
      .required(),
    Password: Joi.string().required()
  };
  return Joi.validate(data, schema);
}

module.exports = app;
//module.exports = schema;
