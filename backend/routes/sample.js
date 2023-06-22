const express = require("express");
const router = express.Router();

//functions
const { sampleFun } = require("../controllers/sample");

router.route("").get(sampleFun);

module.exports = router;
