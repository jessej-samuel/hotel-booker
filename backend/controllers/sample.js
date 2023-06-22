const asyncHandler = require("express-async-handler");
const { CustomError } = require("../error/custom");

const sampleFun = asyncHandler(async (req, res) => {
  try {
    res.status(200).send("hello");
  } catch (err) {
    throw new CustomError(err.message, 400);
  }
});

module.exports = { sampleFun };
