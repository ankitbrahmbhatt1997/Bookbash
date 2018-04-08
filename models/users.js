const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  googleID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userImage: {
    type: String
  },
  College: {
    type: String,
    default: "IMSEC"
  },
  Course: {
    type: String,
    default: "BTECH"
  },
  Branch: {
    type: String,
    default: "IT"
  },
  Year: {
    type: String,
    default: "3rd"
  },
  count: {
    type: Boolean,
    default: false
  }
});
const User = mongoose.model("users", userSchema);

module.exports = User;
