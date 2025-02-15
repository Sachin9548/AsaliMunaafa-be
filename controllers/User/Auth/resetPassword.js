const User = require("../../../models/user");
const SignupValidation = require("../../../helpers/joi-validation");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const bcrypt = require("bcrypt");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");

const resetPassword = async (req, res) => {
    const { logger } = req;
    try {
        const { password, email } = req.body;
        const { error } = SignupValidation.validateResetPassword({ password });

        if (error) {
            const obj = {
                res,
                status: STATUS_CODE.BAD_REQUEST,
                msg: error.details[0].message,
            };
            return Response.error(obj);
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        const userEmailExist = await User.findOne({
            email: email
        });
        if (!userEmailExist) {
            const obj = {
                res,
                status: STATUS_CODE.BAD_REQUEST,
                msg: ERROR_MSGS.ACCOUNT_NOT_EXISTS
            };
            return Response.error(obj);
        }

        await User.findByIdAndUpdate(
            { _id: userEmailExist._id },
            {
                password: passwordHash,
                "forgotPassword.createdAt": Date.now(),
            },
            { new: true }
        )

        const obj = {
            res,
            status: STATUS_CODE.OK,
            msg: INFO_MSGS.PASSWORD_CHANGED
        };
        return Response.error(obj);
    } catch (error) {
        console.log("resetPassword Error", error);
        return handleException(logger, res, error);
    }
};

module.exports = {
    resetPassword
}