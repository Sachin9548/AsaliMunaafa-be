const querystring = require("querystring");
const { STATUS_CODE, INFO_MSGS } = require("../../../helpers/constant");
const Response = require("../../../helpers/response");
require("dotenv").config();

const generateAuthUrl = async (req, res) => {
  try {
    const { userId } = req;
    const state = JSON.stringify({ userId });
    const authUrl = `https://www.facebook.com/v20.0/dialog/oauth?${querystring.stringify(
      {
        client_id: process.env.FACEBOOK_APP_ID,
        redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
        state: Buffer.from(state).toString("base64")
      }
    )}`;

    const obj = {
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.OK,
      data: authUrl,
    };
    return Response.success(obj);
  } catch (error) {
    console.error("Error while generating auth URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { generateAuthUrl };
