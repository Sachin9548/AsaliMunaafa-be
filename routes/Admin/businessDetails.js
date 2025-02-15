const { Router } = require("express");
const router = Router();

const { getAll } = require("../../controllers/Admin/BusinessDetails/getAll");
const { getDetails } = require("../../controllers/Admin/BusinessDetails/getDetails");
const { remove } = require("../../controllers/Admin/BusinessDetails/delete");
const { update } = require("../../controllers/Admin/BusinessDetails/update");

router.get("/", getAll);
router.get("/:id", getDetails);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;