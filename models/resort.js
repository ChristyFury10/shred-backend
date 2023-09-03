// require mongoose, already connected in connection.js in db folder in
const { mongoose } = require('../db/connection');
// const mongoose = require("mongoose")

let Schema = mongoose.Schema;

const resortSchema = new Schema({
    resortname: {type:String, unique: true, required: true}

})

const Resort = mongoose.model("Resort", resortSchema);

module.exports = Resort;