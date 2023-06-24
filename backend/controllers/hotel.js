const asyncHandler = require("express-async-handler");
const { CustomError } = require("../error/custom");
const HotelModel = require("../models/hotel");
const OrderModel = require("../models/order");

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

const getHotelBookings = asyncHandler(async (req, res) => {
  try {
    const { hotelId } = req.params;

    const { from, to } = req.query;
    // var dateArray = [];
    let results = [];
    let date = new Date(from);
    let last = new Date(to);
    while (date <= last) {
      date = new Date(date);
      let datas = {
        K: 0,
        KAC: 0,
        D: 0,
        DAC: 0,
        S: 0,
        SAC: 0,
      };

      const details = await OrderModel.find({
        $and: [
          {
            hotelId: hotelId,
          },
          { fromDate: { $lte: new Date(date).toISOString() } },
          { toDate: { $gte: new Date(date).toISOString() } },
        ],
      });
      for (let i = 0; i < details.length; i++) {
        const temp = details[i];
        datas = {
          K: datas["K"] + parseInt(temp.K.count),
          KAC: datas["KAC"] + parseInt(temp.KAC.count),
          D: datas["D"] + parseInt(temp.D.count),
          DAC: datas["DAC"] + parseInt(temp.DAC.count),
          S: datas["S"] + parseInt(temp.S.count),
          SAC: datas["SAC"] + parseInt(temp.SAC.count),
        };
      }
      // dateArray.push();
      const obj = {};
      obj[date] = datas;
      results = [...results, obj];
      date.setDate(date.getDate() + 1);
    }

    // console.log(results);
    res.status(200).send(results);
  } catch (err) {
    throw new CustomError("Error occured", 400);
  }
});

/*
  TODO:
  - Send available room types for the given date range
  

*/
module.exports = { getAllHotels, getHotelById, getHotelBookings };
