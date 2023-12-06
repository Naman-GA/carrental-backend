const mongoose = require("mongoose");
const validator = require("validator");

const serviceSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid.");
      }
    },
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  model: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("SERVICE", serviceSchema);
