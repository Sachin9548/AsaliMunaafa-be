const { Router } = require("express");
const userRoute = Router();

const shopifyRoute = require("./shopify");

userRoute.use("/", shopifyRoute);

module.exports = userRoute;