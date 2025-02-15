const { Router } = require("express");
const router = Router();

const { getAll } = require("../../controllers/Admin/GetInTouch/getAll");
const { getDetails } = require("../../controllers/Admin/GetInTouch/getDetails");
const { remove } = require("../../controllers/Admin/GetInTouch/delete");
const { update } = require("../../controllers/Admin/GetInTouch/update");

router.get("/", getAll);
router.get("/:id", getDetails);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;