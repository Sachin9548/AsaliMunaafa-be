const { STATUS_CODE, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const axios = require("axios");
const { google } = require("googleapis");
require("dotenv").config();

const generateAuthUrl = async (req, res) => {
  const { logger } = req;
  try {
    let { userId } = req;

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    const scopes = ["https://www.googleapis.com/auth/adwords"];
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
    //   prompt: "consent",
      scope: scopes,
      state: JSON.stringify({ userId }),
    });

    const obj = {
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: url,
    };
    return Response.success(obj);
  } catch (error) {
    console.error("Error while generating auth URL:", error);
    return handleException(logger, res, error);
  }
};

module.exports = { generateAuthUrl };
