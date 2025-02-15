const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const googleAccountsSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("google_Accounts", googleAccountsSchema);
