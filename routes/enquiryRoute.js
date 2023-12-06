const express = require('express')
const router = express.Router()
const enquiryController=require("../controller/enquiry")
const auth = require("../middlewares/middlewares");

router.post('/', enquiryController.enqu)
router.get('/', auth.permited(["admin"]), enquiryController.getEnqu)
router.get('/:id',auth.permited(["admin"]),enquiryController.getbyid)
router.patch('/EnquiryUpdate/:id',auth.permited(["admin"]),enquiryController.updateEnq);
router.delete("/bulk",auth.permited(["admin"]),enquiryController.bulkdelete);


module.exports = router