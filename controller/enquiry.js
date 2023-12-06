const express = require("express");
const Enquiry = require("../models/enquiryModel");

exports.enqu = async (req, res) => {
  try {
    const data = req.body;
    const form = new Enquiry(data);
    await form.save();
    res.json({
      data: form,
      message: "Enquiry Saved.",
      status: true,
      code: 200,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEnqu = async (req, res) => {
  try {
    const data = await Enquiry.find()
    .populate('carId');
    res.json({
      data: data.map((value) =>({
        User:{
          _id:value._id,
          name:value.name,
          surname:value.surname,
          city:value.city,
          state:value.state,
          pincode:value.pincode,
          email:value.email,
          phone:value.phone,
          remark:value.remark
        },
        Car_Details:value.carId
      })),
      message: "List of Car Enquiry",
      status: true,
      code: 200,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateEnq = async (req, res) => {
  const id = req.params.id;
  try {
    const enquirydata = await Enquiry.findByIdAndUpdate(
      id,
      { remark: req.body.remark },
      {
        new: true,
      }
    );
    //console.log(enquirydata);
    res.json({
      data: enquirydata,
      status: 201,
    });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};

exports.getbyid=async(req,res)=>{
  const _id=req.params.id;
  try{
    const data=await Enquiry.findById({_id})
    .populate('carId');
    res.json({
      data:{
        User:{
          name:data.name,
          surname:data.surname,
          city:data.city,
          state:data.state,
          pincode:data.pincode,
          email:data.email,
          phone:data.phone
        },
        Car_Details:data.carId,
        remark:data.remark,
      },
      message: "List of Car Enquiry by id",
      status: true,
      code: 200,
    })
  }catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.bulkdelete=async(req,res)=>{
  try{
    const da=req.body.data;
    for(let i=0;i<da.length;i++){
      await Enquiry.deleteMany({_id:{$in:[da[i]]}})
    }
    res.json({
      success:true,
      message:"Deleted Succesfully",
      code:201
    })
  }
  catch(error){
    res.json({
      success:false,
      message:error.message,
      code:400})
  }
}