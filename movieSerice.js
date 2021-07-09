const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  Title: String,
  NumberInStock: { type: Number },
  DailyRentalRate: { type: Number },
  Genre: { type: String, enum: ["action", "comedy", "thriller"] }
});
//creating model
const Model = mongoose.model("movies3", schema);
// const data = new Model({
//   title: "msdfgdfgdga",
//   numberInStock: 5,
//   dailyRentalRate: 3,
//   genreName: "comedy"
// });
// async function add() {
//   try {
//     //front-end joi validation
//     console.log("under movies");
//     console.log("data=", data);
//     const { error } = validate(data);
//     console.log("error got= ", error);
//     if (error) {
//       return console.log("joi validation occourred", error.message);
//     }
//     console.log("abcd");
//     const result = await data.save();
//     console.log("record saved");
//   } catch (e) {
//     console.log("error while doing backend validation:", e);
//   }

//   //const fetch = await
// }
// //add();

app.get("/", async (req, res) => {
  console.log("came");
  try {
    const result = await Model.find();
    res.send(result);
  } catch (e) {
    res.send("promise rejected");
  }
});
app.post("/add", async (req, res) => {
  // //check user is authenticated or not
  //   const getToken = req.headers["x-auth"];

  //   try {
  //     const result = jwt.verify(getToken, "jwtKey");
  //     res.send("successfully deleted");
  //   } catch (err) {
  //     res.status(404).send(err);
  //   }

  const data = new Model({
    Title: req.body.Title,
    NumberInStock: req.body.NumberInStock,
    DailyRentalRate: req.body.DailyRentalRate,
    Genre: req.body.Genre
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
    const moviesaved = await data.save();
    res.send(moviesaved);
    console.log("request came");
  } catch (e) {
    res.send("promise rejected");
  }
});
app.post("/delete", async (req, res) => {
  const find = await Model.findOneAndDelete(req.body._id);
  res.send("movie removed");
  //Model.remove();
});
function validate(data) {
  const schema = {
    Title: Joi.string()
      .min(3)
      .required(),
    NumberInStock: Joi.number().required(),
    DailyRentalRate: Joi.number().required(),
    Genre: Joi.string().required()
  };
  // const userdata = {
  //   Title: data.title,
  //   NumberInStock: data.NumberInStock,
  //   DailyRentalRate: data.DailyRentalRate,
  //   Genre: data.Genre
  // };
  return Joi.validate(data, schema);
}
module.exports = app;
