const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const { google } = require("googleapis");
const Credentials = require("../../../models/credentials");
const { ObjectId } = require("mongoose").Types;
require("dotenv").config();

const googleCallback = async (req, res) => {
  const { logger } = req;
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    const { code, state } = req.query;
    const { userId } = JSON.parse(state);
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    let getCrede = await Credentials.findOne({
      userId: new ObjectId(userId),
      platform: "google",
    });

    if (!getCrede) {
      let crede = {
        userId: userId,
        platform: "google",
        "google.access_token": tokens.access_token,
        "google.refresh_token": tokens.refresh_token,
        "google.expiry_date": tokens.expiry_date,
        "google.generatedDate": new Date(),
      };
      await Credentials.create(crede);
    } else {
      const updateData = {
        "google.access_token": tokens.access_token,
        "google.expiry_date": tokens.expiry_date,
        "google.generatedDate": new Date(),
      };

      if (tokens.refresh_token) {
        updateData["google.refresh_token"] = tokens.refresh_token;
      }

      await Credentials.findByIdAndUpdate(
        { _id: new ObjectId(getCrede._id) },
        updateData,
        { new: true }
      );
    }

    return res.redirect(`https://asalimunaafa.com/marketing-platform`);
  } catch (error) {
    console.error("Error while handling Google callback:", error);
    return handleException(logger, res, error);
  }
};

module.exports = { googleCallback };
