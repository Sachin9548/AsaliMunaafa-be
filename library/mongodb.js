"use strict";
const mongoose = require("mongoose");

const MongoDBconnect = async () => {
  try {
    console.log("\x1b[3m\x1b[31mMongoDB URL \x1b[31m--->\x1b[0m", process.env.MONGODB_CONNECTION_STRING);

    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  } catch (error) {
    console.error("Mongoose Connection Error:", error);
  }
};

module.exports = { MongoDBconnect };