const { Router } = require("express");
const userRoute = Router();

const googleRoute = require("./google");
const metaRoute = require("./meta");
const snapRoute = require("./snapchat");
const metaauth = require("./metaauth");

userRoute.use("/metaauth",metaauth);

userRoute.use("/google", googleRoute);
userRoute.use("/meta", metaRoute);
userRoute.use("/snapchat", snapRoute);

module.exports = userRoute;