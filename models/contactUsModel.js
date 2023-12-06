const mongoose = require('mongoose')
const validator = require("validator");

const formSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Email is Invalid.");
            }
          }
    },
    phone: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('CONTACTUS', formSchema)
