const { Router } = require("express"); 
const shippingRoute = Router();

const { userAuth } = require("../../middleware/auth");
const shiprocketRoute = require("./shiprocket");
const delhiveryRoute = require("./delhivery");
const credentialRoute = require("./credential");

shippingRoute.use(userAuth);
shippingRoute.use("/crede", credentialRoute);
shippingRoute.use("/shiprocket", shiprocketRoute);
shippingRoute.use("/delhivery", delhiveryRoute);

module.exports = shippingRoute;
