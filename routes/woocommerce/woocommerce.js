const { Router } = require("express");
const router = Router();

const { auth } = require("../../controllers/WooCommerce/auth");

router.post("/auth", auth);

module.exports = router;
