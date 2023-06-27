const express = require("express");
const router = express.Router();

const {
  getAllHotels,
  getHotelById,
  getHotelBookings,
  isBookAllowed,
} = require("../controllers/hotel");

router.route("").get(getAllHotels);
router.route("/:hotelId/stats").get(getHotelBookings);
router.route("/:hotelId/availability").get(isBookAllowed);
router.route("/:hotelId").get(getHotelById);

module.exports = router;
