const GetInTouch = require('../../../models/getInTouch');
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const validation = require("../../../helpers/joi-validation");

const create = async (req, res) => {
  const { logger } = req;
  try {
    let { email } = req.body

    const { error } = validation.emailVerification({ email });
    if (error) {
      const obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: error.details[0].message,
      };
      return Response.error(obj);
    }
    const saveData = await GetInTouch.create(req.body);

    const statusCode = saveData ? STATUS_CODE.CREATED : STATUS_CODE.BAD_REQUEST;
    const message = saveData ? INFO_MSGS.CREATED_SUCCESSFULLY : ERROR_MSGS.CREATE_ERR;

    return Response[saveData ? 'success' : 'error']({
      req,
      res,
      status: statusCode,
      msg: message,
      data: saveData || null
    });
  } catch (error) {
    console.error('error:', error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  create
};