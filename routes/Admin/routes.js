const { Router } = require("express");
const adminRoute = Router();

const auth = require("./auth")
const getInTouch = require("./getInTouch")
const user = require("./user")
const businessDetails = require("./businessDetails")
const { adminAuth } = require("../../middleware/auth")

adminRoute.use("/auth", auth);
adminRoute.use(adminAuth)
adminRoute.use("/user", user);
adminRoute.use("/getInTouch", getInTouch);
adminRoute.use("/businessDetails", businessDetails);

module.exports = adminRoute;
