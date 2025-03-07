const { Router } = require("express");
const v1 = Router();

// v1.get("/", (req, res) => {
//   res.status(200).json({ message: "v1 routes working!!" });
// });

const userRoute = require("./User/routes");
const adminRoute = require("./Admin/routes");
const webhooksRoute = require("./Webhooks/routes");
const shopify = require("./Shopify/routes");
const woocommerce = require("./woocommerce/woocommerce");
const marketing = require("./Marketing/routes");
const shipping = require("./Shipping/routes");



v1.use("/user", userRoute);
v1.use("/admin", adminRoute);

// third module
v1.use("/webhooks", webhooksRoute);
v1.use("/marketing", marketing);
v1.use("/shopify", shopify);
v1.use("/woocommerce", woocommerce);
v1.use("/shipping", shipping);


//dashboard



module.exports = v1;
