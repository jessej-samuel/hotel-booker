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

const getAllHotels = asyncHandler(async (req, res) => {
  let hotels = await HotelModel.find({});
  if (hotels.length === 0) {
    throw new CustomError("No hotels are registered", 400);
  }

  const hotelData = [];
  for (let i = 0; i < hotels.length; ++i) {
    var hotel = hotels[i];
    hotelData.push({
      id: hotel._id,
      name: hotel.name,
      location: hotel.location,
    });
  }

  res.status(200).send(hotelData);
});

module.exports = { orderHotel, getAllHotels };
