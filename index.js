const express = require("express");
const app = express();
const mongoose = require("mongoose");
const movies = require("./movieSerice.js");
const genre = require("./genreService.js");
const login = require("./login.js");
const register = require("./register");

var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/movies", movies);
app.use("/login", login);
app.use("/register", register);
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
