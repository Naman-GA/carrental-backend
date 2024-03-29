const express = require('express')
const Car = require('../models/carModel')

exports.recentCars=async(req, res) => {
    try{
        const cars = await Car.find().sort({_id:-1})
        res.json({
            "data": cars,
            "message": "List of 5 recent cars",
            "status": true,
            "code": 200
        })
    }catch(err){
        res.send('Error: ' + err)
    }
}

exports.getById=async(req, res) => {
    try{
        const cars = await Car.findById(req.params.id)
        res.json({
            "data": cars,
            "message": "Car by id: " + req.params.id,
            "status": true,
            "code": 200
        })
    }catch(err){
        res.send('Error: ' + err)
    }
}

exports.getByCompany=async(req, res) => {
    try{
        const car = await Car.find({'company': req.params.company})
        res.json({
            "data": car,
            "message": "List of all " + req.params.company + " cars.",
            "status": true,
            "code": 200
        })
    }catch(err){
        res.send('Error ' + err)
    }
}

exports.getByBodyStyle_sedan=async(req, res) => {
    try{
        const car = await Car.find({'body_style': 'Sedan'})
        res.json({
            "data": car,
            "message": "List of all sedan cars.",
            "status": true,
            "code": 200
        })
    }catch(err){
        res.send('Error ' + err)
    }
}

exports.getByBodyStyle_SUV=async(req, res) => {
    try{
        const car = await Car.find({'body_style': 'SUV'})
        res.json({
            "data": car,
            "message": "List of all SUV cars.",
            "status": true,
            "code": 200
        })
    }catch(err){
        res.send('Error ' + err)
    }
}

exports.getByBodyStyle_luxury=async(req, res) => {
    try{
        const car = await Car.find({'body_style': 'Luxury'})
        res.json({
            "data": car,
            "message": "List of all luxury cars.",
            "status": true,
            "code": 200
        })
    }catch(err){
        res.send('Error ' + err)
    }
}

exports.advanceSearch=async(req, res) => {
    try{
        const company = req.params.company
        const model = req.params.model
        const trim = req.params.trim
        const year = req.params.year
        const car = await Car.find({$and:[{'company': company}, {'model': model}, {'trim': trim}, {'year': year}]})
        res.json({
            "data": car,
            "message": "List of all cars based on user search request",
            "status": true,
            "code": 200
        })
    }catch(err){
        res.send('Error ' + err)
    }
}
