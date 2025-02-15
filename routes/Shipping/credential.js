const { Router } = require("express");
const router = Router();

const { create } = require("../../controllers/Shipping/saveCrede");

router.post("/", create);

module.exports = router;
