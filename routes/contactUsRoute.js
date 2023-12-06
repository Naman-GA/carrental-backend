const express = require("express");
const router = express.Router()
const contactController=require("../controller/contactUs");
const auth = require("../middlewares/middlewares");

router.post('/', contactController.contactUsform);
router.get('/', auth.permited(["admin"]),contactController.getForm)
router.delete("/bulk",auth.permited(["admin"]),contactController.bulkdelete);

module.exports = router
