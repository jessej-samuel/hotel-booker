const express = require("express");
const router = express.Router();

//functions
const {
  userReg,
  userLogin,
  hotelReg,
  hotelLogin,
} = require("../controllers/auth");

router.route("/user/register").post(userReg);
router.route("/user/login").post(userLogin);
router.route("/hotel/register").post(hotelReg);
router.route("/hotel/login").post(hotelLogin);

module.exports = router;
