const express = require("express");
const router = express.Router();

const {
  getAllHotels,
  getHotelById,
  getHotelBookings,
} = require("../controllers/hotel");

router.route("").get(getAllHotels);

router.route("/:hotelId/order").get(getHotelBookings);
router.route("/:hotelId").get(getHotelById);

module.exports = router;
