const express = require("express");
const router = express.Router();
const carController=require("../controller/car")
const  auth = require("../middlewares/middlewares");
const multer=require("multer")
const path=require("path")
const fs=require("fs")
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');


const s3 = new AWS.S3({
  accessKeyId: "AKIA535LFGYHYVNDEVUY",
  secretAccessKey: "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",
});

const storage=multerS3({
  s3: s3,
  bucket: 'myproductupload',
  key: (req, file, cb) => {
        cb(null,file.fieldname+'-'+Math.random()+Date.now()+path.extname(file.originalname))
    }
  });
const upload = multer({
    storage:storage
});

/* Fetch All Product */
router.get("/", carController.getCars);
router.delete("/bulk",auth.permited(["admin"]),carController.bulkdelete);

router.get("/comapanylist",carController.company);

/* Fetch Recent Product */
router.get("/recent",carController.recentCars );

/* Fetch Product by id */
router.get("/:id",carController.getByid);

/* Fetch Product by company */
router.get("/company/:company",carController.getByCompany );

/* Fetch Product by model */
router.get("/model/:model",carController.getByModel );

/* Fetch Product by year */
router.get("/year/:year", carController.getByYear);

/* Fetch Product by color */
router.get("/color/:color",carController.getByColor );

/* Fetch Product by categories */
router.get("/categories/:categories", carController.getByCategory);

/* Add Product */
router.post("/", auth.permited(["admin"]),upload.array('images'),carController.addCar);

/* Update Product */
router.patch("/update/:id",auth.permited(["admin"]), carController.updateCar);

/* Delete Product */
router.delete("/delete/:id", auth.permited(["admin"]),carController.delete );

/* Advance Search */
router.get( "/advance-search/:company/:model/:trim/:year/:lprice/:hprice/:lmileage/:hmileage/:ldate/:hdate/:num_cylinders/:cylinders/:condition/:color/:int_color/:ext_type/:num",carController.advanceSearch);

/* Fetch Product by Price Range */
router.get("/price/:lprice/:hprice", carController.getByPriceRange);

/* Fetch Product by KM Range */
router.get("/km/:lkm/:hkm", carController.getByKmRange );


module.exports = router;
