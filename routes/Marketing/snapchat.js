const express = require('express');
const { snapCallback } = require('../../controllers/Marketing/snapchat/callback');
const { generateAuthUrl } = require('../../controllers/Marketing/snapchat/generateAuthUrl');
const { userAuth } = require("../../middleware/auth")

const router = express.Router();

router.get('/callback', snapCallback);

router.use(userAuth)
router.post('/generateUrl', generateAuthUrl);

module.exports = router;
