const mongoose = require("mongoose");

const getInTouchSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      default: null
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      default: null
    },
    mobile: {
      type: String,
      required: true,
      default: null
    },
    website: {
      type: String,
      default: null
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GetInTouch", getInTouchSchema);