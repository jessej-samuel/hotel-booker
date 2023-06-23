const asyncHandler = require("express-async-handler");
const { CustomError } = require("../error/custom");
const HotelModel = require("../models/hotel");
const OrderModel = require("../models/order");

const orderHotel = asyncHandler(async (req, res) => {
  try {
    const { hotelId } = req.params;

    const { userId, fromDate, toDate, userName, K, KAC, D, DAC, S, SAC } =
      req.body;

    if (!userId || !userName || !hotelId || !fromDate || !toDate) {
      throw new CustomError("Please specify the required fields", 400);
    }

    const HotelExists = await HotelModel.findById({
      _id: hotelId,
    });

    console.log(HotelExists);
    if (HotelExists) {
      const Order = OrderModel.create({
        userId,
        fromDate,
        toDate,
        userName,
        K,
        KAC,
        D,
        DAC,
        S,
        SAC,
      });
      res.status(200).send(Order);
    }

    // res.status(200).send("hello");
  } catch (err) {
    throw new CustomError(err.message, 400);
  }
});

module.exports = { orderHotel };
