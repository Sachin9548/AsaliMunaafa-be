const { Router } = require("express");
const userRoute = Router();

const shopifyWebhooks = require("./shopifyWebhooks");

userRoute.use("/", shopifyWebhooks);

module.exports = userRoute;