const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
require("dotenv").config();
const axios = require("axios");
const { DELHIVERY_CLIENT_ID, DELHIVERY_CLIENT_SECRET, DELHIVERY_REDIRECT_URI } =
  process.env;

const callback = async (req, res) => {
  const { logger } = req;
  try {
    const authCode = req.query.code;

    const tokenResponse = await axios.post(
      "https://auth.delhivery.com/oauth/token",
      {
        client_id: DELHIVERY_CLIENT_ID,
        client_secret: DELHIVERY_CLIENT_SECRET,
        code: authCode,
        grant_type: "authorization_code",
        redirect_uri: DELHIVERY_REDIRECT_URI,
      }
    );

    const obj = {
      res,
      status: STATUS_CODE.OK,
      msg: "Shiprocket account connected successfully!",
      data: tokenResponse.data,
    };
    return Response.success(obj);
  } catch (error) {
    console.error("error:", error);
    return handleException(logger, res, error);
  }
};

module.exports = { callback };
