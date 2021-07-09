const mongoose = require("mongoose");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { Model } = require("./models/login");
config.get("jwtPrivateKey");

// const schema = new mongoose.Schema({
//   Email: String,
//   Password: String
// });
//const Modela = mongoose.model("logins", schema);
app.post("/", async (req, res) => {
  console.log("came");
  const data = new Model({
    Email: req.body.Email,
    Password: req.body.Password
  });
  try {
    //console.log("came2");
    //since in db, we stored password as hashed form, we need to check it using bcrypt
    const fetch = await Model.find({ Email: req.body.Email });
    // console.log("came3");
    // console.log("fetch[0].Password=", fetch[0].Password);
    const result = await bcrypt.compare(req.body.Password, fetch[0].Password);
    // console.log("came4");
    // console.log("bcrypt value= ", result);
    // console.log(fetch.length);
    if (fetch.length > 0 && result == true) {
      // console.log("under login", req.body.Email);
      // console.log("fetch=", fetch);
      // console.log("hashed password from db=", fetch[0].Password);

      // console.log("result=", result);

      //check whether jwt private key is defined or not
      if (!config.get("jwtPrivateKey")) {
        console.error("FATAL ERROR: jwtPrivateKey is not defined.");
        console.log("private key not defined", config.get("jwtPrivateKey"));
        process.exit(1);
      }
      console.log("private key defined", config.get("jwtPrivateKey"));
      ///generate jwt token
      const jwtToken = jwt.sign(
        { email: req.body.Email },
        config.get("jwtPrivateKey")
      );
      console.log("jwttoken=", jwtToken);
      //send in response
      res
        .header("x-auth-token", jwtToken)
        .header("access-control-expose-headers", "x-auth-token")
        .send("done");
    } else {
      console.log("user not present");
      res.status(404).send("user not present");
      return 0;
    }
  } catch (e) {
    console.log("error", e);
    res.status(404).send("exception occourred in backend", e);
  }
});

module.exports = app;
