const express = require("express");
const router = express.Router();

const { orderHotel, getAllHotels } = require("../controllers/order");

router.route("/:hotelId").post(orderHotel);
router.route("").get(getAllHotels);

module.exports = router;
