const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require('../models/adminModel')

exports.adminLogin=async(req,res)=>{
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user){
          return res.json({
            status:false,
            code:401,
            message:"You are not registered please Signup!"
          });
        }
        else{
        if (user.role === "admin") {
          //console.log(user);
          if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.json({
              success:false,
              code:400,
              message:
                "Authentication failed. Invalid user or password or not Admin.",
            });
          }
          return res.json({
            _id: user._id,
            success: true,
            token :jwt.sign(
              { uid: user._id, role: user.role },
              "naman",
              {
              expiresIn: "2h",
              }
            ),
            name: user.firstName,
            surname: user.lastName,
            phone: user.phone,
            location: user.location,
            email: user.email,
            message: "Login Successful",
            success: true,
            code: 200,
          });
        } else {
          return res.json({
            message: "Authentication failed. You are Not Admin.",
            code: 400,
            success: false,
          });
        }
      }
      } catch (error) {
        console.log(error);
        res.send("Error" + error);
      }
}

exports.adminSignup=async (req, res) => {
  try {
    const existingUser = await User.findOne({ email:req.body.email });
    if (existingUser)
      return res.json({ 
        status:false,
        code:403,
        message: "User already exist"
       });
    const encryptedPassword= await bcrypt.hash(req.body.password, 10);
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        password: encryptedPassword,
        ban:req.body.ban,
        location:req.body.location,
        phone:req.body.phone
    });
    await user.save();
    res.json({ message: "data saved" });
} catch (error) {
    console.log(error);
    res.send({
        success: false,
        code:400,
        message: error.message || "Some error occurred while Creating the Admin."
    });
}
}

exports.getUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    res.status(200).json({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      success: true,
      code: 200,
      message: "single user fetch!!",
    });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

exports.getAllusers = async (req, res) => {
  try {
    const userAll = await User.find({}).select("-password").sort({ _id: -1 });
    res.status(200).json({
      data: userAll,
      success: true,
      code: 200,
      message: "all users get here!!",
    });
  } catch (error) {
    res.status(409).json(error.message);
  }
};

exports.delete = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("   No user with that id. ");
  await User.findByIdAndRemove(_id);

  res.json({ message: "User deleted successfully!" });
};

exports.updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No User with that id. ");
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { ...user, _id },
    { new: true }
  );
  res.json(updatedUser);
};


exports.ban = async (req, res) => {
  try {
      const _id = req.params.id;
      const data = await User.findByIdAndUpdate(_id, { ban: req.body.ban }, {
          new: true
      });
      res.json({ msg: "User banned" })
  } catch (error) {
      res.json({ msg: error.msg })
  }
}

exports.getbannedusers=async(req,res)=>{
  try{
    console.log("garg");
    const data=await User.find({ban:true}).select("-password").sort({ _id: -1 });
    res.status(200).json({
      data: data,
      success: true,
      code: 200,
      message: "Banned users get here!!",
    });
  } catch (error) {
    console.log(error);
    res.status(409).json(error.message);
  }
  }

  exports.getActiveusers= async (req, res) => {
    try {
      const userAll = await User.find({ban:true}).select("-password").sort({ _id: -1 });
      res.status(200).json({
        data: userAll,
        success: true,
        code: 200,
        message: "all users get here!!",
      });
    } catch (error) {
      res.status(409).json(error.message);
    }
  };