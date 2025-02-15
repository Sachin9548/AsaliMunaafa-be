const express = require('express');
const { metaCallback } = require('../../controllers/Marketing/meta/callback');
const { generateAuthUrl } = require('../../controllers/Marketing/meta/generateAuthUrl');
const { userAuth } = require("../../middleware/auth");
const {fetchMarketingOverview} = require('../../controllers/Marketing/meta/marketingController');
const metaController = require("../../controllers/Marketing/meta/metapage.js");

const router = express.Router();

router.get('/callback', metaCallback);

router.use(userAuth)

router.get("/overview", fetchMarketingOverview);
router.get("/metadata",metaController.getMetaData);
router.post('/generateUrl', generateAuthUrl);

module.exports = router;
