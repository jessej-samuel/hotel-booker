const asyncHandler = require("express-async-handler");
const { CustomError } = require("../error/custom");
const HotelModel = require("../models/hotel");

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

const getHotelById = asyncHandler(async (req, res) => {
  const { hotelId } = req.params;
  try {
    const HotelExists = await HotelModel.findById({
      _id: hotelId,
    });
    if (HotelExists) {
      res.status(200).send(HotelExists);
    } else throw new CustomError("No Hotel with such Id exist", 400);
  } catch (err) {
    throw new CustomError("No Hotel with such Id exist", 400);
  }
});
module.exports = { getAllHotels, getHotelById };
