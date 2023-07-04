const express = require("express");
const router = express.Router();

const {
  orderHotel,
  getAllHotels,
  deleteOrder,
  editOrder,
  getOrderDetail,
} = require("../controllers/order");

router.route("/:hotelId").post(orderHotel);
router.route("/:orderId/delete").delete(deleteOrder);
router.route("/:orderId/edit").put(editOrder);
router.route("/:orderId").get(getOrderDetail);

module.exports = router;
