const asyncHandler = require("express-async-handler");
const { CustomError } = require("../error/custom");
const UserModel = require("../models/auth");

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
  try {
    res.status(200).send("hello");
  } catch (err) {
    throw new CustomError(err.message, 400);
  }
});

const hotelReg = asyncHandler(async (req, res) => {
  try {
    res.status(200).send("hello");
  } catch (err) {
    throw new CustomError(err.message, 400);
  }
});

const hoteLogin = asyncHandler(async (req, res) => {
  try {
    res.status(200).send("hello");
  } catch (err) {
    throw new CustomError(err.message, 400);
  }
});

module.exports = { userReg, hoteLogin, hotelReg, userLogin };
