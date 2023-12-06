const express = require("express");
const router = express.Router();
const loginController=require("../controller/admin");
const auth = require("../middlewares/middlewares");

router.post("/login",loginController.adminLogin);
router.get("/getbannedusers",loginController.getbannedusers);
router.get("/getactiveusers",loginController.getActiveusers)
router.post("/signup",loginController.adminSignup);
router.get('/:id',auth.permited(["admin"]),loginController.getUser);
router.get('/',auth.permited(["admin"]),loginController.getAllusers);
router.delete('/delete/:id',auth.permited(["admin"]),loginController.delete);
router.patch('/updateUser/:id',auth.permited(["admin"]),loginController.updateUser);
router.patch('/ban/:id',auth.permited(["admin"]),loginController.ban);
module.exports = router;
