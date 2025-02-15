const User = require('../../../models/user');
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const { ObjectId } = require("mongoose").Types;

const update = async (req, res) => {
  const { logger } = req;
  try {
    const { id } = req.params;

    const updateData = await User.findByIdAndUpdate(
      { _id: new ObjectId(id) },
      req.body,
      { new: true }
    );

    const statusCode = updateData ? STATUS_CODE.OK : STATUS_CODE.BAD_REQUEST;
    const message = updateData ? INFO_MSGS.UPDATED_SUCCESSFULLY : ERROR_MSGS.UPDATE_ERR;

    return Response[statusCode === STATUS_CODE.OK ? 'success' : 'error']({
      req,
      res,
      status: statusCode,
      msg: message
    });
  } catch (error) {
    console.error('error:', error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  update
};