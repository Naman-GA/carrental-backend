const express = require("express");
const router = express.Router();
const newsletterController=require("../controller/newsletter")
const auth=require("../middlewares/middlewares");

router.post("/",newsletterController.subs);
router.get("/",auth.permited(["admin"]),newsletterController.getlist);
router.delete("/bulk",auth.permited(["admin"]),newsletterController.bulkdelete)

module.exports=router;