const express = require('express')
const router = express.Router()
const homeSearchController=require("../controller/homeSearch")

router.get('/recent',homeSearchController.recentCars)

router.get('/:id',homeSearchController.getById)

router.get('/company/:company',homeSearchController.getByCompany)

router.get('/body_style/sedan', homeSearchController.getByBodyStyle_sedan)

router.get('/body_style/SUV',homeSearchController.getByBodyStyle_SUV)

router.get('/body_style/luxury',homeSearchController.getByBodyStyle_luxury)

router.get('/advance-search/:company/:model/:trim/:year',homeSearchController.advanceSearch);

module.exports = router
