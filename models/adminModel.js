const Joi = require("joi");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema=new mongoose.Schema(
    {
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
        }
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
      },
      role: {
        type: String,
        required: true,
      },
      ban:{
        type:Boolean,
        default:false
      },
      location:{
        type:String
      }
    },
    {
      timestamps: true,
    })

// function validateUser(user) {
//   const schema = Joi.object({
//     name: Joi.string().min(3).max(50).required(),
//     surname: Joi.string().min(3).max(50).required(),
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(5).max(255).required(),
//     phone: Joi.string()
//       .length(10)
//       .pattern(/^[0-9]+$/)
//       .required(),
//     role: Joi.string().min(5).max(50),
//     location: Joi.string().min(3),
//   });
//   return schema.validate(user);
// }

module.exports=mongoose.model("USER",userSchema)
// exports.validate = validateUser;
