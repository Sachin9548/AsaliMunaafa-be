const { Router } = require("express");
const router = Router();

const { generateUrl } = require("../../controllers/Shipping/delhivery/generateUrl");
const { callback } = require("../../controllers/Shipping/delhivery/callback");

router.post("/connect", generateUrl);
router.get("/callback", callback);

module.exports = router;