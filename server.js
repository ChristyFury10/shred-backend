///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 4000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require('./db/connection.js');
const cors = require("cors");
const morgan = require("morgan");

const Resort = require('./models/resort.js')
///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
// mongoose.connect(MONGODB_URL, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });
// Connection Events
// mongoose.connection
//   .on("open", () => console.log("Your are connected to mongoose"))
//   .on("close", () => console.log("Your are disconnected from mongoose"))
//   .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const ResortsSchema = new mongoose.Schema({
    name: String
  });
  
  const Resorts = mongoose.model("Resorts", ResortsSchema);
  
  ///////////////////////////////
  // MiddleWare
  ////////////////////////////////
  app.use(cors()); // to prevent cors errors, open access to all origins
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan("dev")); // logging
  app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/resorts", async (req, res) => {
  try {
    // send all resorts
    res.json(await Resorts.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

app.post("/resorts", async (req, res) => {
  try {
    const createdResort = await Resort.create(req.body);
    res.status(201).json(createdResort);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));