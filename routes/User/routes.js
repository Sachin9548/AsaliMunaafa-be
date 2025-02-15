const { Router } = require("express");
const userRoute = Router();

const { userAuth } = require("../../middleware/auth")
const getInTouch = require("./getInTouch");
const auth = require("./auth");
const otp = require("./otp");
const profile = require("./profile");
const businessDetails = require("./businessDetails");

userRoute.use("/getInTouch", getInTouch);
userRoute.use("/auth", auth);
userRoute.use("/otp", otp);

userRoute.use(userAuth)
userRoute.use("/profile", profile);
userRoute.use("/businessDetails", businessDetails);


module.exports = userRoute;