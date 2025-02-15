const { STATUS_CODE, INFO_MSGS } = require("../../../helpers/constant");
const Response = require("../../../helpers/response");
const axios = require("axios");
require("dotenv").config();

const metaCallback = async (req, res) => {
  try {
    const { logger } = req;
    const { FACEBOOK_APP_ID, FACEBOOK_SECRET_ID, FACEBOOK_REDIRECT_URI } =
      process.env;

    const code = req.query.code;
    const tokenUrl = `https://graph.facebook.com/v10.0/oauth/access_token?client_id=${FACEBOOK_APP_ID}&redirect_uri=${FACEBOOK_REDIRECT_URI}&client_secret=${FACEBOOK_SECRET_ID}&code=${code}`;

    const response = await axios.get(tokenUrl);
    const accessToken = response.data;

    const obj = {
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.OK,
      data: accessToken,
    };
    return Response.success(obj);
  } catch (error) {
    console.error("Error while handling Facebook callback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { metaCallback };
