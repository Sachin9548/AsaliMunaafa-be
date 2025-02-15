const { Router } = require("express");
const router = Router();

const { sentOtp } = require("../../controllers/User/Otp/sentOtp");
const { verifyOtp } = require("../../controllers/User/Otp/verifyOtp");

router.post("/sentOtp", sentOtp);
router.post("/verifyOtp", verifyOtp);

module.exports = router;