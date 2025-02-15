const { Router } = require("express");
const router = Router();

const { update } = require("../../controllers/User/Profile/update");
const { getUser } = require("../../controllers/User/Profile/getUser");

router.put("/", update);
router.get("/", getUser);

module.exports = router;