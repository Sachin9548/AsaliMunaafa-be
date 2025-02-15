const User = require("../../../models/user");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const { STATUS_CODE, INFO_MSGS } = require("../../../helpers/constant");

const logOut = async (req, res) => {
    const { logger } = req;
    try {
        let { userId, type } = req

        await User.findByIdAndUpdate(
            { _id: userId },
            {
                $set: {
                    "token.type": "Denied"
                }
            }
        )
        const obj = {
            res,
            status: STATUS_CODE.OK,
            msg: INFO_MSGS.SUCCESS
        };
        return Response.success(obj);
    } catch (error) {
        console.log("logOut Error", error);
        return handleException(logger, res, error);
    }
};

module.exports = {
    logOut
}