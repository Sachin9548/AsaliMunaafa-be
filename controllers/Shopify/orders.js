const Credentials = require("../../models/credentials");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../helpers/constant");
const { handleException } = require("../../helpers/exception");
const Response = require("../../helpers/response");
const { shopifyCrede } = require("../../helpers/shopify");


const fetchOrders = async (req, res) => {
    const { logger } = req;
    try {
        const shopify = await shopifyCrede(req, res)
        const orders = await shopify.order.list();
        
        const statusCode = orders.length > 0 ? STATUS_CODE.OK : STATUS_CODE.OK;
        const message = orders.length > 0 ? INFO_MSGS.SUCCESS : ERROR_MSGS.DATA_NOT_FOUND;

        return Response[statusCode === STATUS_CODE.OK ? 'success' : 'error']({
            req,
            res,
            status: statusCode,
            msg: message,
            data: orders.length > 0 ? { Response: orders } : { Response: [] }
        });
    } catch (error) {
        console.error('error:', error);
        return handleException(logger, res, error);
    }
};

module.exports = { fetchOrders };