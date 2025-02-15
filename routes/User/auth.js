const { Router } = require("express");
const router = Router();

const { signUp } = require("../../controllers/User/Auth/signUp");
const { logIn } = require("../../controllers/User/Auth/logIn");
const { logOut } = require("../../controllers/User/Auth/logOut");
const { resetPassword } = require("../../controllers/User/Auth/resetPassword");

const { userAuth } = require("../../middleware/auth")
const { googleAuthTokenVerify } = require("../../helpers/gmail");
const { signUpWithGoogle } = require("../../controllers/User/Auth/signUpWithGoogle");
const { verifyOtpToken } = require("../../middleware/verifyToken")

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/resetPassword", verifyOtpToken, resetPassword);
router.post("/signIn/google", googleAuthTokenVerify, signUpWithGoogle);

router.use(userAuth)
router.post("/logOut", logOut);

module.exports = router;