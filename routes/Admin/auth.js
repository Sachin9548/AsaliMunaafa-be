const { Router } = require("express");
const router = Router();

const { logIn } = require("../../controllers/Admin/Auth/logIn");

router.post("/logIn", logIn);

module.exports = router;