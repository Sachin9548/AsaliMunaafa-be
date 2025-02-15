const express = require("express");
const {
  googleCallback,
} = require("../../controllers/Marketing/google/callback");
const {
  generateAuthUrl,
} = require("../../controllers/Marketing/google/generateAuthUrl");
const {
  fetchCampaigns,
} = require("../../controllers/Marketing/google/fetchCampaigns");
const {
  fetchCustomers,
} = require("../../controllers/Marketing/google/fetchCustomers");
const { manageAccounts } = require("../../controllers/Marketing/google/manageAccounts");
// Middleware
const { userAuth } = require("../../middleware/auth");
const { checkGoogleToken } = require("../../middleware/checkGoogleToken");

const router = express.Router();

router.get("/callback", googleCallback);
router.use(userAuth);
router.post("/generateUrl", generateAuthUrl);
router.post("/manage/accounts", manageAccounts);
router.use(checkGoogleToken);
router.get("/customers", fetchCustomers);
router.get("/campaigns", fetchCampaigns);

module.exports = router;
