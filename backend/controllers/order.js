const asyncHandler = require("express-async-handler");
const { CustomError } = require("../error/custom");
const HotelModel = require("../models/hotel");

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
    }

    res.status(200).send("hello");
  } catch (err) {
    throw new CustomError(err.message, 400);
  }
});

module.exports = { orderHotel };
