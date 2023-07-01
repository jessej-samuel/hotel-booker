const asyncHandler = require("express-async-handler");
const { CustomError } = require("../error/custom");
const HotelModel = require("../models/hotel");
const OrderModel = require("../models/order");
const Axios = require("axios");

const orderHotel = asyncHandler(async (req, res) => {
  try {
    const { hotelId } = req.params;

    const { userId, fromDate, toDate, userName, K, KAC, D, DAC, S, SAC } =
      req.body;

    if (!userId || !userName || !hotelId || !fromDate || !toDate) {
      throw new CustomError("Please specify the required fields", 400);
    }
    let yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
    if (new Date(fromDate) < yesterday || new Date(toDate) < yesterday) {
      throw new CustomError("Invalid dates", 401);
    }
    try {
      const HotelExists = await HotelModel.findOne({
        _id: hotelId,
      });
      // console.log(HotelExists);
    } catch (error) {
      // console.log(error);
      throw new CustomError("No such hotel exists!", 400);
    }
    const { data } = await Axios.get(
      `${process.env.BASE_URL}/hotel/${hotelId}/availability?from=${fromDate}&to=${toDate}`
    );
    // console.log(data);
    if (
      (K && K.count > data.K) ||
      (KAC && KAC.count > data.KAC) ||
      (D && D.count > data.D) ||
      (DAC && DAC.count > data.DAC) ||
      (S && S.count > data.S) ||
      (SAC && SAC.count > data.SAC)
    ) {
      throw new CustomError(
        "Sorry we don't have that much rooms free right now",
        400
      );
    }
    const Order = await OrderModel.create({
      userId,
      hotelId,
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
  } catch (err) {
    throw new CustomError(err.message, 400);
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    throw new CustomError("Please specify the orderId to delete", 400);
  }

  const result = await OrderModel.deleteOne({
    _id: orderId,
  });
  // console.log(result);
  if (result.deletedCount) res.status(200).send("Order deleted successfully!");
  else throw new CustomError("No such order exist", 400);
});

const getOrderDetail = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    throw new CustomError("Please specify the orderId to get details", 400);
  }
  try {
    const result = await OrderModel.findOne({
      _id: orderId,
    });
    res.status(200).send(result);
  } catch (error) {
    throw new CustomError("No such order exist", 400);
  }
});

const editOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { K, KAC, D, DAC, S, SAC } = req.body;
  if (!orderId) {
    throw new CustomError("Please specify the orderId to edit", 400);
  }
  try {
    let oldOrder = await OrderModel.findOne({
      _id: orderId,
    });
    console.log(oldOrder);
    const { data } = await Axios.get(
      `${process.env.BASE_URL}/hotel/${oldOrder.hotelId}/availability?from=${oldOrder.fromDate}&to=${oldOrder.toDate}`
    );
    const check = (type, obj) => {
      if (oldOrder[type].count + data[type] < obj.count) {
        throw new CustomError(
          `Sorry we dont have that much ${type} room right now`,
          400
        );
      }
    };
    let newOrder = {};

    if (K) {
      check("K", K);
      newOrder["K"] = K;
    }
    if (D) {
      check("D", D);
      newOrder["D"] = D;
    }
    if (S) {
      check("S", S);
      newOrder["S"] = S;
    }
    if (DAC) {
      check("DAC", DAC);
      newOrder["DAC"] = DAC;
    }
    if (KAC) {
      check("KAC", KAC);
      newOrder["KAC"] = KAC;
    }
    if (SAC) {
      check("SAC", SAC);
      newOrder["SAC"] = SAC;
    }
    const result = await OrderModel.findOneAndUpdate(
      { _id: orderId },
      newOrder,
      {
        new: true,
      }
    );
    res.status(200).send(result);
  } catch (err) {
    throw new CustomError(err.message, 400);
  }
});

module.exports = { orderHotel, deleteOrder, editOrder, getOrderDetail };
