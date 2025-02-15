const { Router } = require("express");
const router = Router();

const { add } = require("../../controllers/User/BusinessDetails/add");
const { getDetails } = require("../../controllers/User/BusinessDetails/getDetails");

router.post("/", add);
router.get("/", getDetails);

module.exports = router;