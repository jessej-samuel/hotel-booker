const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      trim: true,
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

userSchema.methods.matchPassword = async function (pass) {
  return (await pass) === this.password;
};

const Users = mongoose.models.Users || mongoose.model("User", userSchema);

module.exports = Users;
