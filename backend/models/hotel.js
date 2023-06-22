const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

hotelSchema.methods.matchPassword = async function (pass) {
  return (await pass) === this.password;
};

const Hotels =
  mongoose.models.hotelSchema || mongoose.model("Hotel", hotelSchema);

module.exports = Hotels;
