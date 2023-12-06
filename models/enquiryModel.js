const mongoose = require("mongoose");
const validator = require("validator");

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: false,
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
    carId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "CAR",
    },
    remark: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ENQUIRY", enquirySchema);
