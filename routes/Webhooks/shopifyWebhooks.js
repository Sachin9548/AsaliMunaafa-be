const { Router } = require("express");
const router = Router();

const { shop_data_erasure } = require("../../controllers/Webhooks/shopify/shop_data_erasure");
const { customer_data_erasure } = require("../../controllers/Webhooks/shopify/customer_data_erasure");
const { customer_data_request } = require("../../controllers/Webhooks/shopify/customer_data_request");

router.post("/shop_data_erasure", shop_data_erasure);
router.post("/customer_data_erasure", customer_data_erasure);
router.post("/customer_data_request", customer_data_request);

module.exports = router;