const express = require("express");
const router = express.Router();

const {
  orderHotel,
  getAllHotels,
  deleteOrder,
  editOrder,
} = require("../controllers/order");

router.route("/:hotelId").post(orderHotel);
router.route("/:orderId/delete").delete(deleteOrder);
router.route("/:orderId/edit").put(editOrder);

module.exports = router;
