const express = require("express");
const Car = require("../models/carModel");
const AWS = require('aws-sdk');
const BUCKET_NAME='myproductupload'

const s3 = new AWS.S3(
  {
    accessKeyId: "AKIA535LFGYHYVNDEVUY",
    secretAccessKey: "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"
  });


exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
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

exports.recentCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ _id: -1 }).limit(6);
    res.json({
      data: cars,
      message: "List of 6 recent cars",
      status: true,
      code: 200,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.getByid = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
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

exports.getByCompany = async (req, res) => {
  try {
    let company = req.params.company;
    const data = await Car.find({ company: req.params.company });
    res.json({
      data: data,
      message: `Product List ${company}`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.getByModel = async (req, res) => {
  try {
    let model = req.params.model;
    const data = await Car.find({ model: req.params.model });
    res.json({
      data: data,
      message: `Product List ${model}`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.getByYear = async (req, res) => {
  try {
    let year = req.params.year;
    const data = await Car.find({ year: req.params.year });
    res.json({
      data: data,
      message: `Product List ${year}`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.getByColor = async (req, res) => {
  try {
    let color = req.params.color;
    const data = await Car.find({ color: req.params.color });
    res.json({
      data: data,
      message: `Product List ${color}`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.getByCategory = async (req, res) => {
  try {
    let categories = req.params.categories;
    const data = await Car.find({ categories: req.params.categories });
    res.json({
      data: data,
      message: `Product List ${categories}`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.addCar = async (req, res) => {
  let info = req.body;
  console.log(req.files);
  const car = new Car(info);
  try {
    const c1 = await car.save();
    const num = Object.keys(req.files).length;
    // console.log(num, c1._id);
    for (let i = 0; i < num; i++) {
      const n = await Car.findByIdAndUpdate(c1._id, { $push: { "images":req.files[i].location} }, {
        new: true
      })
    }
    res.json({
      message: "Car Saved",
      status: true,
      code: 200,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.updateCar = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Car.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const car=await Car.findById(id);
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
    const data = await Car.findByIdAndDelete(id);
    res.json({
      success:true,
      message:`Document with ${data.id} has been deleted..`,
      code:200
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.advanceSearch = async (req, res) => {
  try {
    const company = req.params.company;
    const model = req.params.model;
    const trim = req.params.trim;
    const year = req.params.year;
    const num_cylinders = req.params.num_cylinders;
    const cylinders = req.params.cylinders;
    const condition = req.params.condition;
    const lprice = req.params.lprice;
    const hprice = req.params.hprice;
    const lmileage = req.params.lmileage;
    const hmileage = req.params.hmileage;
    var ldate = req.params.ldate;
    var hdate = req.params.hdate;
    const ext_color = req.params.ext_color;
    const int_color = req.params.int_color;
    const ext_type = req.params.ext_type;
    const num = req.params.num;
    const cur_date = new Date();
    ldate = cur_date - ldate * 86400000;
    hdate = cur_date - hdate * 86400000;
    var car = new Car();
    if (num == 1)
      car = await Car.find({
        $or: [
          { company: company },
          { model: model },
          { trim: trim },
          { year: year },
          { price: { $gte: lprice, $lte: hprice } },
          { mileage: { $gte: lmileage, $lte: hmileage } },
          { date: { $gte: hdate, $lte: ldate } },
          { num_cylinders: num_cylinders },
          { cylinders: cylinders },
          { condition: condition },
          { color: color },
          { int_color: int_color },
          { ext_type: ext_type },
        ],
      }).sort({ _id: -1 });
    else if (num == 2)
      car = await Car.find({
        $or: [
          { company: company },
          { model: model },
          { trim: trim },
          { year: year },
          { price: { $gte: lprice, $lte: hprice } },
          { mileage: { $gte: lmileage, $lte: hmileage } },
          { date: { $gte: hdate, $lte: ldate } },
          { num_cylinders: num_cylinders },
          { cylinders: cylinders },
          { condition: condition },
          { color: color },
          { int_color: int_color },
          { ext_type: ext_type },
        ],
      }).sort({ price: 1 });
    else
      car = await Car.find({
        $or: [
          { company: company },
          { model: model },
          { trim: trim },
          { year: year },
          { price: { $gte: lprice, $lte: hprice } },
          { mileage: { $gte: lmileage, $lte: hmileage } },
          { date: { $gte: hdate, $lte: ldate } },
          { num_cylinders: num_cylinders },
          { cylinders: cylinders },
          { condition: condition },
          { color: color },
          { int_color: int_color },
          { ext_type: ext_type },
        ],
      }).sort({ price: -1 });
    // console.log(Car.find({'company': company}));
    res.json({
      data: car,
      message: "List of all cars based on user search request",
      status: true,
      code: 200,
    });
  } catch (err) {
    res.send("Error " + err);
  }
}

exports.company=async(req,res)=>{
  try{
    const data=await Car.distinct('company')
    res.json({
      success:true,
      data:data,
      code:201,
      message:"List of Comapanies"
    })
  }
  catch(error){
    res.json({
      success:false,
      code:401,
      message:"Something went wrong!"
    })
  }
}



exports.getByPriceRange = async (req, res) => {
  try {
    let lprice = req.params.lprice;
    let hprice = req.params.hprice;
    const data = await Car.find({ price: { $gte: lprice, $lte: hprice } });
    res.json({
      data: data,
      message: `Product List with Price Range ${lprice}--${hprice}`,
      status: true,
      code: 200,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
exports.bulkdelete = async (req, res) => {
  try {
    const da = req.body.data;
    for (let i = 0; i < da.length; i++) {
      await Car.deleteMany({ _id: { $in: [da[i]] } })
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

exports.getByKmRange = async (req, res) => {
  try {
    let lkm = req.params.lkm;
    let hkm = req.params.hkm;
    const data = await Car.find({ km: { $gte: lkm, $hkm: hkm } });
    res.json({
      data: data,
      message: `Product List with KM Range ${lkm}--${hkm}`,
      status: true,
      code: 200,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


