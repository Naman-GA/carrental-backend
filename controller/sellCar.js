const express = require('express')
const sellCar=require("../models/sellCarModel");
const Car=require("../models/carModel")
const AWS = require('aws-sdk');
const BUCKET_NAME='sellercarupload'

const s3 = new AWS.S3(
  {
    accessKeyId: "AKIA535LFGYHYVNDEVUY",
    secretAccessKey: "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"
  });

exports.sell=async(req,res)=>{
    let data=req.body;
    const details=new sellCar(data)
    try {
        const c1 = await details.save();
        const num = Object.keys(req.files).length;
        console.log(num, c1._id);
        for (let i = 0; i < num; i++) {
            await sellCar.findByIdAndUpdate(c1._id, { $push: { "images":req.files[i].location} }, {
            new: true
        })
        }
        res.json({
          message: "Details Saved",
          status: true,
          code: 200,
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

exports.get=async (req, res) => {
    try {
      const cars = await sellCar.find();
      res.json({
        data: cars,
        message: "List of all cars",
        status: true,
        code: 200,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  exports.getById=async (req, res) => {
    try {
      const car = await sellCar.findById(req.params.id);
      res.json({
        data: car,
        message: "Search Result by ID",
        status: true,
        code: 200,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  exports.updateDetails=async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true,useFindAndModify: false };
  
      const result = await sellCar.findByIdAndUpdate(id, updatedData, options);
      res.send(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  exports.delete=async (req, res) => {
    try {
      const id = req.params.id;
      const data = await sellCar.findByIdAndDelete(id);
      res.send(`Document with ${data.id} has been deleted..`);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  exports.saveCar=async(req,res)=>{
    try{
        const _id=req.params.id;
        const data=await sellCar.find({_id})
        const d=req.body
        const newEntry=new Car(d,data)
        await newEntry.save();
        res.send(newEntry)
    }
    catch(error){
        res.send(400).json({message:error.message})
    }
  }

  exports.images=async(req,res)=>{
    try {
        const url = req.protocol + '://' + req.get('host')
        const _id = req.params.id;
        for(let i=0;i<2;i++){
          await sellCar.findByIdAndUpdate(_id, { $push:{"car.images":url + '/public/' + req.files[i].filename}},{
            new:true,useFindAndModify: false
        })
        }
        res.json({message:"success"})
        }   
        catch (error) {
        console.log(error);
        res.json({
            msg: error.msg
        })
    }
  }

  exports.delete = async (req, res) => {
    try {
      const id = req.params.id;
      const car=await sellCar.findById(id);
      const leng=car.images.length;
      for (let i=0;i<leng;i++){
        let k=car.images[i].slice(41,);
        let params = {
          Bucket: BUCKET_NAME,
          Key: k
        }
        s3.deleteObject(params, function(err, data) {
          if (err) {
            console.log(err, err.stack);
          } else {
            console.log(`Image with key ${params.Key} has been deleted from S3 bucket.`);
          }
        });
      }
      const data = await sellCar.findByIdAndDelete(id);
      res.json({
        success:true,
        message:`Document with ${data.id} has been deleted..`,
        code:200
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }