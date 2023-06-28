const express = require("express");
const router = express.Router();

const { getOrderHistory } = require("../controllers/user");

router.route("/:userId/orders").get(getOrderHistory);

module.exports = router;
