const { Router } = require("express");
const router = Router();

const { create } = require("../../controllers/User/GetInTouch/create");

router.post("/", create);

module.exports = router;