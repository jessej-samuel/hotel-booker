const express = require("express");
const router = express.Router();

const { getAllHotels, getHotelById } = require("../controllers/hotel");

router.route("").get(getAllHotels);

router.route("/:hotelId").get(getHotelById);

module.exports = router;
