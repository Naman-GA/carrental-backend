const express = require("express");
const router = express.Router();
const sellController=require("../controller/sellCar")
const auth = require("../middlewares/middlewares");
const multer = require("multer")
const path=require('path')
const fs=require("fs")
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');


const s3 = new AWS.S3({
  accessKeyId: "AKIA535LFGYHYVNDEVUY",
  secretAccessKey: "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",
});

const storage=multerS3({
  s3: s3,
  bucket: 'sellercarupload',
  key: (req, file, cb) => {
        cb(null,file.fieldname+'-'+Math.random()+Date.now()+path.extname(file.originalname))
    }
  });
const upload = multer({
    storage:storage
});

router.post("/",upload.array('images',5),sellController.sell);
router.get("/get",auth.permited(["admin"]),sellController.get)
router.get("/:id",auth.permited(["admin"]),sellController.getById);
router.patch("/update/:id",auth.permited(["admin"]),sellController.updateDetails);
router.delete("/delete/:id",auth.permited(["admin"]),sellController.delete);
router.post("/adminSell/:id",auth.permited(["admin"]),sellController.saveCar);
router.delete("/delete/:id",auth.permited(["admin"]),sellController.delete);

module.exports=router;