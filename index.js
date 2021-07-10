const express = require("express");
const app = express();
const mongoose = require("mongoose");
const genre = require("./genreService.js");
const login = require("./login.js");
const register = require("./register");
const emails = require("./emails.js");
const OTPService = require("./OTPService");
var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/login", login);
app.use("/register", register);
app.use("/emails", emails);
app.use("/OTPService", OTPService);
app.use(genre);

////connecting to db///
//csmco

mongoose
  .connect("mongodb://localhost:27017/myapp", { useNewUrlParser: true })
  .then(console.log("connected"));
const Port = process.env.PORT | 4000;
//for production
app.listen(Port, () => {
  console.log("listening on port ", Port);
});
