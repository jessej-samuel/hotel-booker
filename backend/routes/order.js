const express = require("express");
const router = express.Router();

const {
  orderHotel,
  getAllHotels,
  deleteOrder,
} = require("../controllers/order");

router.route("/:hotelId").post(orderHotel);
router.route("/:orderId/delete").delete(deleteOrder);

module.exports = router;
