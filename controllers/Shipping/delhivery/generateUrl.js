const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
require("dotenv").config();
const { DELHIVERY_CLIENT_ID, DELHIVERY_REDIRECT_URI } = process.env;

const generateUrl = async (req, res) => {
  const { logger } = req;
  try {
    const authUrl = `https://auth.delhivery.com/oauth/authorize?response_type=code&client_id=${DELHIVERY_CLIENT_ID}&redirect_uri=${DELHIVERY_REDIRECT_URI}`;

    const obj = {
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: authUrl,
    };
    return Response.success(obj);
  } catch (error) {
    console.error("error:", error);
    return handleException(logger, res, error);
  }
};

module.exports = { generateUrl };
