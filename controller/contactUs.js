const express = require('express')
const Form = require('../models/contactUsModel')

exports.contactUsform=async(req, res) =>{
    let info = req.body
    const form = new Form(info)
    try{
        await form.save()
        res.json({
            "data": form,
            "message": "Form Saved",
            "status": true,
            "code": 200
        })
    }catch(err){
        res.send(err)
    }
}

exports.getForm=async(req,res) => {
    try{
        const contactForm = await Form.find()
        res.json({
            "data": contactForm,
            "message": "List of all contact Query",
            "status": true,
            "code": 200
        })
    }catch(error){res.send('Error: ' + error)}
}

exports.bulkdelete=async(req,res)=>{
    try{
      const da=req.body.data;
      for(let i=0;i<da.length;i++){
        const nw=await Form.deleteMany({_id:{$in:[da[i]]}})
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