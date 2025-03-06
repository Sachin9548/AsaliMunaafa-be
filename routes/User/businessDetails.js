const { Router } = require("express");
const router = Router();

const { add } = require("../../controllers/User/BusinessDetails/add");
const { getDetails } = require("../../controllers/User/BusinessDetails/getDetails");
const {fetchProducts} = require("../../controllers/User/BusinessDetails/fetchproductforcost");

router.post("/", add);
router.get("/", getDetails);
router.get("/fetchproduct",fetchProducts);

module.exports = router;