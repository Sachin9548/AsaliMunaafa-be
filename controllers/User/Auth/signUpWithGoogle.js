const User = require("../../../models/user");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { logIn } = require("./logIn")

const signUpWithGoogle = async (req, res) => {
    const { logger } = req;
    try {
        const { email, name } = req.decoded;
        const userInfo = await User.findOne({ email });
        if (!userInfo) {
            await User.create({
                fullName: name,
                email: email,
                registrationType: "Google",
            });
            const obj = {
                res,
                status: STATUS_CODE.CREATED,
                msg: INFO_MSGS.SUCCESSFUL_REGISTER,
            };
            return Response.success(obj);
        }
        req.body = {
            emailOrPhone: email,
            registrationType: "Google"
        }
        return logIn(req, res)
    } catch (error) {
        console.error("Error signing up with Google:", error);
        return handleException(logger, res, error);
    }
};

module.exports = {
    signUpWithGoogle
};