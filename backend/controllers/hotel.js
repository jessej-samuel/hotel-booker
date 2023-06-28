const asyncHandler = require("express-async-handler");
const { CustomError } = require("../error/custom");
const HotelModel = require("../models/hotel");
const OrderModel = require("../models/order");
const Axios = require("axios");
const { response } = require("express");

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
  let HotelExists;
  try {
    const { hotelId } = req.params;
    try {
      HotelExists = await HotelModel.findById({
        _id: hotelId,
      });
      if (!HotelExists) {
        throw new CustomError("No Hotel with such Id exist", 400);
      }
    } catch (err) {
      throw new CustomError("No Hotel with such Id exist", 400);
    }
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

    res.status(200).send(results);
  } catch (err) {
    throw new CustomError("Error occured", 400);
  }
});

const isBookAllowed = asyncHandler(async (req, res) => {
  const { from, to } = req.query;
  const { hotelId } = req.params;
  if (!from || !to || !hotelId) {
    throw new CustomError("Please specify the required fields", 400);
  }
  try {
    const HotelExists = await HotelModel.findById({
      _id: hotelId,
    });
    // console.log(HotelExists);
    if (HotelExists) {
      try {
        const { data } = await Axios.get(
          `${process.env.BASE_URL}/hotel/${hotelId}/stats?from=${from}&to=${to}`
        );
        let result = {
          K: HotelExists["K"].count,
          KAC: HotelExists["KAC"].count,
          D: HotelExists["D"].count,
          DAC: HotelExists["DAC"].count,
          S: HotelExists["S"].count,
          SAC: HotelExists["SAC"].count,
        };
        // res.send(data);
        for (let i = 0; i < data.length; i++) {
          let curr = data[i];
          let key = Object.keys(curr)[0];

          // console.log(key);
          result = {
            K: Math.min(result.K, HotelExists["K"].count - curr[key]["K"]),
            KAC: Math.min(
              result.KAC,
              HotelExists["KAC"].count - curr[key]["KAC"]
            ),
            D: Math.min(result.D, HotelExists["D"].count - curr[key].D),
            DAC: Math.min(
              result.DAC,
              HotelExists["DAC"].count - curr[key]["DAC"]
            ),
            S: Math.min(result.S, HotelExists["S"].count - curr[key].S),
            SAC: Math.min(
              result.SAC,
              HotelExists["SAC"].count - curr[key]["SAC"]
            ),
          };
        }
        res.status(200).send(result);
      } catch (err) {
        console.log(err);
        throw new CustomError("No Hotel with such Id exist", 400);
      }
    } else {
      // console.log(HotelExists);
      throw new CustomError("No Hotel with such Id exist", 400);
    }
  } catch (err) {
    // console.log(err);
    throw new CustomError("No Hotel with such Id exist", 400);
  }
});

const getHotelOrders = asyncHandler(async (req, res) => {
  const { hotelId } = req.params;
  if (!hotelId) {
    throw new CustomError("Please specify the required fields", 400);
  }
  try {
    const Orders = await OrderModel.find({
      hotelId,
    });
    // console.log(Orders);
    res.status(200).send(Orders);
  } catch (err) {
    throw new CustomError(err.message, 400);
  }
});

module.exports = {
  getAllHotels,
  getHotelById,
  getHotelBookings,
  isBookAllowed,
  getHotelOrders,
};
