const express = require('express')
const Service = require('../models/serviceModel')

exports.serviceRequest=async(req,res) => {
    try{
        let info = req.body
        const form = new Service(info)
        await  form.save()
        res.json({
            "data": form,
            "message": "Service Booked.",
            "status": true,
            "code": 200
        })
    }catch(error){
        res.status(400).json({ message: error.message })
}
}

exports.getForm=async(req,res) => {
    try{
        const contactForm = await Service.find()
        res.json({
            "data": contactForm,
            "message": "List of all Service Query",
            "status": true,
            "code": 200
        })
    }catch(error){res.send('Error: ' + error)}
}

exports.update=async(req,res)=>{
    const id=req.params.id
    try{
        const servicedata=await Service.findByIdAndUpdate(id,{status:req.body.status},{
            new:true
        })
        console.log(servicedata);
        res.json({
            data:servicedata,
            status:201
        })
    }
    catch(error){
        res.status(402).json({message:error.message})
    }
}

exports.bulkdelete = async (req, res) => {
    try {
      const da = req.body.data;
      for (let i = 0; i < da.length; i++) {
        await Service.deleteMany({ _id: { $in: [da[i]] } })
      }
      res.json({
        success: true,
        message: "Deleted Succesfully",
        code: 201
      })
    }
    catch (error) {
      res.json({
        success: false,
        message: error.message,
        code: 400
      })
    }
  }