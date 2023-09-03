// // import mongoose
// const mongoose = require("mongoose");
// const { DATABASE_URL } = require('../config');

// // mongoose connect to url
// mongoose.connect(DATABASE_URL);

// mongoose.connection.on("connected", () => {
//     console.log("Mongoose connected to mongoDB")
// })

// mongoose.connection.on("error", (error) => {
//     console.log("mongoDB Connection Error:", error)
// })

// mongoose.connection.on("disconnected", () => {
//     console.log("mongoDB disconnected")
// })

// // export mongoose 
// module.exports = { mongoose }

require("dotenv").config();

const mongoose = require("mongoose");
const {MONGODB_URL} = process.env;

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: "ShredDB", // Specify the correct database name here
  });
//connection events
mongoose.connection
    .on("open", ()=>{console.log("Connected to mongoose")})
    .on("close", ()=>{console.log("Disconnected fom mongoose")})
    .on("error", (error)=>{console.log(error)});

module.exports = mongoose;
