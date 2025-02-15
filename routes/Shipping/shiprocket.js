const { Router } = require("express");
const router = Router();

const { generateToken } = require("../../controllers/Shipping/shiprocket/generateToken");
const { dashboard } = require("../../controllers/Shipping/shiprocket/dashboard");

// POST to generate/update token using provided Shiprocket credentials.
router.post("/generateToken", generateToken);

// GET dashboard data from Shiprocket (requires a valid token stored in DB)
router.get("/dashboard", dashboard);

module.exports = router;
 