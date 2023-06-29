const asyncHandler = require("express-async-handler");
const { CustomError } = require("../error/custom");
const OrderModel = require("../models/order");

const getOrderHistory = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new CustomError("Please specify the required fields", 400);
    }
    try {
      const Orders = await OrderModel.find({
        userId,
      }).populate("hotelId", "-password");
      // console.log(Orders);
      res.status(200).send(Orders);
    } catch (error) {
      throw new CustomError("No such user exists!", 400);
    }
  } catch (err) {
    throw new CustomError(err.message, 400);
  }
});

module.exports = { getOrderHistory };
