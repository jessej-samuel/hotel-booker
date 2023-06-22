const express = require("express");
const router = express.Router();

//functions
const {
  userReg,
  userLogin,
  hotelReg,
  hoteLogin,
} = require("../controllers/auth");

router.route("/user").post(userReg).get(userLogin);
router.route("/hotel").post(hotelReg).get(hoteLogin);

module.exports = router;
