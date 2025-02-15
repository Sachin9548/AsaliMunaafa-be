const express = require('express');
const { installApp } = require('../../controllers/Shopify/installApp');
const { callback } = require('../../controllers/Shopify/callback');
const { fetchOrders } = require('../../controllers/Shopify/orders');
const { fetchProducts } = require('../../controllers/Shopify/products');
const { fetchAnalytics } = require('../../controllers/Shopify/analytics');
const { fetchShop } = require('../../controllers/Shopify/fetchShop');
const { userAuth } = require("../../middleware/auth");
const { manualConnect } = require('../../controllers/Shopify/manualConnect');
const { fetchShopifyOverview } = require("../../controllers/Shopify/shopifyController");
const overalldataRouter = require("../../controllers/Shopify/overalldataController");
const router = express.Router();

// router.get('/callback', callback);
router.post("/manual-connect", userAuth, manualConnect);

router.use(userAuth)
router.post('/fetch/shop', fetchShop);
// router.post('/install', installApp);
router.get("/overview", fetchShopifyOverview);
router.get('/dashboard', overalldataRouter);

router.get('/orders', fetchOrders);
router.get('/products', fetchProducts);
router.get('/analytics', fetchAnalytics);

module.exports = router;
