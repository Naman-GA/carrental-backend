const express = require('express')
const router = express.Router()
const serviceController=require("../controller/serviceForm")
const auth = require("../middlewares/middlewares");

router.post('/', serviceController.serviceRequest)
router.get('/',auth.permited(["admin"]),serviceController.getForm)
router.patch('/statusUpdate/:id',auth.permited(["admin"]),serviceController.update);
router.delete("/bulk",auth.permited(["admin"]),serviceController.bulkdelete)

module.exports = router