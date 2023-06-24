const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      lowercase: true,
      trim: true,
      // required: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
    userName: {
      type: String,
      trim: true,
    },
    fromDate: {
      type: Date,
      trim: true,
    },
    toDate: {
      type: Date,
      trim: true,
    },
    K: {
      count: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
    KAC: {
      count: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
    D: {
      count: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
    DAC: {
      count: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
    S: {
      count: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
    SAC: {
      count: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Orders;
