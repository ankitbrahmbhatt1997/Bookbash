const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

const Adds = mongoose.model("adds", addsSchema);

module.exports = Adds;
