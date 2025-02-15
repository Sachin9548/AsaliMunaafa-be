const BusinessDetails = require('../../../models/businessDetails')
const Response = require("../../../helpers/response");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const { ObjectId } = require("mongoose").Types;

const getDetails = async (req, res) => {
    const { logger } = req;
    try {
        const { userId } = req;
        let getData = await BusinessDetails.aggregate([
            {
                $match: { userId: new ObjectId(userId) }
            },
            {
                $project: {
                    __v: 0,
                },
            },
        ]);

        getData = getData[0];
        const statusCode = getData ? STATUS_CODE.OK : STATUS_CODE.OK;
        const message = getData ? INFO_MSGS.SUCCESS : ERROR_MSGS.DATA_NOT_FOUND;

        return Response[statusCode === STATUS_CODE.OK ? 'success' : 'error']({
            req,
            res,
            status: statusCode,
            msg: message,
            data: getData || null,
        });
    } catch (error) {
        console.log("error--->", error);
        return handleException(logger, res, error);
    }
};

module.exports = {
    getDetails
}