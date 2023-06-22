const asyncHandler = require("express-async-handler");
const { CustomError } = require("../error/custom");
const UserModel = require("../models/auth");
const HotelModel = require("../models/hotel");

const userReg = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new CustomError("Specify the required fields!", 400);
  }
  const UserExists = await UserModel.findOne({
    $or: [{ email: email }],
  });
  if (UserExists) {
    throw new CustomError("Email already exist!", 400);
  }

  const newUser = await UserModel.create({
    username,
    email,
    password,
  });

  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } else {
    throw new CustomError("Failed to create user!", 400);
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError("Specify the required fields!", 400);
  }
  const selectUser = await UserModel.findOne({
    email: email,
  });
  // console.log(selectUser);
  if (selectUser) {
    if (await selectUser.matchPassword(password)) {
      res.status(200).json({
        _id: selectUser._id,
        username: selectUser.username,
        email: selectUser.email,
      });
    } else {
      throw new CustomError("Password is incorrect!", 400);
    }
  } else {
    throw new CustomError("Specified email doesn't exist!", 400);
  }
});

const hotelReg = asyncHandler(async (req, res) => {
  const { name, email, password, location, K, KAC, DAC, D, SAC, S } = req.body;
  if (!name || !email || !password || !location) {
    throw new CustomError("Specify the required fields!", 400);
  }
  const HotelExists = await HotelModel.findOne({
    $or: [{ email: email }],
  });
  if (HotelExists) {
    throw new CustomError("Email already exist!", 400);
  }

  const newHotel = await HotelModel.create({
    name,
    email,
    password,
    location,
    K,
    KAC,
    D,
    DAC,
    S,
    SAC,
  });

  if (newHotel) {
    res.status(200).json({
      _id: newHotel._id,
      name: newHotel.name,
      email: newHotel.email,
      location: newHotel.location,
      K: newHotel.K,
      KAC: newHotel.KAC,
      D: newHotel.D,
      DAC: newHotel.DAC,
      S: newHotel.S,
      SAC: newHotel.SAC,
    });
  } else {
    throw new CustomError("Failed to register hotel!", 400);
  }
});

const hotelLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError("Specify the required fields!", 400);
  }
  const selectUser = await HotelModel.findOne({
    email: email,
  });

  if (selectUser) {
    if (await selectUser.matchPassword(password)) {
      res.status(200).json({
        _id: selectUser._id,
        name: selectUser.name,
        email: selectUser.email,
        location: selectUser.location,
        K: selectUser.K,
        KAC: selectUser.KAC,
        D: selectUser.D,
        DAC: selectUser.DAC,
        S: selectUser.S,
        SAC: selectUser.SAC,
      });
    } else {
      throw new CustomError("Password is incorrect!", 400);
    }
  } else {
    throw new CustomError("Specified email doesn't exist!", 400);
  }
});

module.exports = { userReg, hotelLogin, hotelReg, userLogin };
