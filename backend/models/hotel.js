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
    K: {
      type: {
        count: {
          type: Number,
          min: 0,
        },
        cost: {
          type: Number,
          min: 0,
        },
      },
      default: { count: 0, cost: 0 },
    },
    KAC: {
      type: {
        count: {
          type: Number,
          min: 0,
        },
        cost: {
          type: Number,
          min: 0,
        },
      },
      default: { count: 0, cost: 0 },
    },
    D: {
      type: {
        count: {
          type: Number,
          min: 0,
        },
        cost: {
          type: Number,
          min: 0,
        },
      },
      default: { count: 0, cost: 0 },
    },
    DAC: {
      type: {
        count: {
          type: Number,
          min: 0,
        },
        cost: {
          type: Number,
          min: 0,
        },
      },
      default: { count: 0, cost: 0 },
    },
    S: {
      type: {
        count: {
          type: Number,
          min: 0,
        },
        cost: {
          type: Number,
          min: 0,
        },
      },
      default: { count: 0, cost: 0 },
    },
    SAC: {
      type: {
        count: {
          type: Number,
          min: 0,
        },
        cost: {
          type: Number,
          min: 0,
        },
      },
      default: { count: 0, cost: 0 },
    },

    //K, KAC, D, DAC, S, SAC  --count, cost
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
