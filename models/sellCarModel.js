const mongoose = require("mongoose");

const sellCarSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: Number },
    email: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    company: { type: String },
    model: { type: String },
    year: { type: Number },
    kmDriven: { type: Number },
    color: { type: String },
    price: { type: Number },
    images: { type: Array },
    remark: { type: String },
});

module.exports = mongoose.model("SellCar", sellCarSchema);
