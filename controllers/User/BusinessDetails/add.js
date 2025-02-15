const BusinessDetails = require('../../../models/businessDetails')
const Response = require("../../../helpers/response");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");

const add = async (req, res) => {
    const { logger } = req;
    try {
       const { userId, body } = req;
        let data = { userId, ...body };

        let existingData = await BusinessDetails.findOne({ userId });

        let result;

        if (existingData) {
            result = await BusinessDetails.findByIdAndUpdate(existingData._id, body, { new: true });
        } else {
            result = await BusinessDetails.create(data);
        }

        const statusCode = result ? STATUS_CODE.OK : STATUS_CODE.BAD_REQUEST;
        const message = result ? (existingData ? INFO_MSGS.UPDATED_SUCCESSFULLY : INFO_MSGS.CREATED_SUCCESSFULLY) : ERROR_MSGS[existingData ? 'UPDATE_ERR' : 'CREATE_ERR'];

        return Response[result ? 'success' : 'error']({
            req,
            res,
            status: statusCode,
            msg: message,
            data: result || null
        });

    } catch (error) {
        console.log("error--->", error);
        return handleException(logger, res, error);
    }
};

module.exports = {
    add
}