const { Router } = require("express");
const router = Router();

const { getAll } = require("../../controllers/Admin/User/getAll");
const { getDetails } = require("../../controllers/Admin/User/getDetails");
const { remove } = require("../../controllers/Admin/User/delete");
const { update } = require("../../controllers/Admin/User/update");

router.get("/", getAll);
router.get("/:id", getDetails);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;