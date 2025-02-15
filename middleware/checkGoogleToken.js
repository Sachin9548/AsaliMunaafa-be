const { OAuth2Client } = require("google-auth-library");
const Credentials = require("../models/credentials");
const { handleException } = require("../helpers/exception");

const checkGoogleToken = async (req, res, next) => {
  const { logger } = req;
  try {
    const { userId } = req;
    const getCredentials = await Credentials.findOne({
      userId: userId,
      platform: "google",
    });

    let accessToken = getCredentials.google.access_token;
    let refreshToken = getCredentials.google.refresh_token;
    let expiryDate = getCredentials.google.expiry_date;

    expiryDate = parseInt(expiryDate);
    const currentTime = Date.now();

    if (currentTime >= expiryDate) {
      console.log("Access token is expired, refreshing...");

      const oauth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
      );

      oauth2Client.setCredentials({
        refresh_token: refreshToken,
      });

      const tokens = await oauth2Client.refreshAccessToken();
      accessToken = tokens.credentials.access_token;
      const newExpiryDate = tokens.credentials.expiry_date;

      await Credentials.updateOne(
        { userId: userId, platform: "google" },
        {
          "google.access_token": accessToken,
          "google.expiry_date": newExpiryDate,
        }
      );
    }

    req.accessToken = accessToken;
    req.refreshToken = refreshToken;
    next();
  } catch (error) {
    console.error("Error refreshing Google access token:", error);
    return handleException(logger, res, error.errors);
  }
};

module.exports = { checkGoogleToken };
