const User = require('../../../models/user');
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const { ObjectId } = require("mongoose").Types;

const getDetails = async (req, res) => {
  const { logger } = req;
  try {
    const { id } = req.params;
    console.log('id :>> ', id);

    let noteData = await User.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        }
      },
      {
        $project: {
          __v: 0,
          password: 0,
          forgotPassword: 0,
          token: 0,
        },
      },
    ]);

    noteData = noteData[0];

    const statusCode = noteData ? STATUS_CODE.OK : STATUS_CODE.OK;
    const message = noteData ? INFO_MSGS.SUCCESS : ERROR_MSGS.DATA_NOT_FOUND;

    return Response[statusCode === STATUS_CODE.OK ? 'success' : 'error']({
      req,
      res,
      status: statusCode,
      msg: message,
      data: noteData || null,
    });
  } catch (error) {
    console.error('error:', error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  getDetails
};