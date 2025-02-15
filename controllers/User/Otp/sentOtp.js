const Otp = require('../../../models/otp')
const Response = require("../../../helpers/response");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const { VerificationEmail } = require("../../../utils/emailVerification");

const sentOtp = async (req, res) => {
    const { logger } = req;
    try {
        const { email } = req.body
        let otp = Math.floor(100000 + Math.random() * 900000);
        var otpData = {
            email,
            otp,
        };
        await VerificationEmail(email, otp);

        //Handle success
        await Otp.findOneAndDelete({ email: email })
        let saveData = await Otp.create(otpData);
        if (!saveData) {
            const obj = {
                res,
                status: STATUS_CODE.BAD_REQUEST,
                msg: ERROR_MSGS.WENT_WRONG
            };
            return Response.error(obj);
        }
        setTimeout(async () => {
            await Otp.findOneAndDelete({
                otp,
            });
        }, 5 * 60 * 1000);
        const obj = {
            res,
            status: STATUS_CODE.CREATED,
            msg: INFO_MSGS.OTP_SENT_SUCC,
            data: otp
        };
        return Response.success(obj);

    } catch (error) {
        console.log("error--->", error);
        return handleException(logger, res, error);
    }
};

module.exports = {
    sentOtp
}