const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  number_of_messages: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  creation_date: {
    type: Date,
    required: true
  }
});

module.exports = User = mongoose.model("user", UserSchema);
