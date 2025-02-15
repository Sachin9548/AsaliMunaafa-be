const { OAuth2Client } = require("google-auth-library");
const { handleException } = require("../helpers/exception");
const Response = require("../helpers/response");
const { STATUS_CODE, ERROR_MSGS } = require("../helpers/constant");

const googleAuthTokenVerify = async (req, res, next) => {
  const { logger } = req;
  try {
    const { tokenId } = req.body;
    if (!tokenId) {
      return Response.error({
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.TOKEN_MISSING,
      });
    }

    const client = new OAuth2Client(process.env.SIGN_IN_GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.SIGN_IN_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    req.decoded = payload;
    next();
  } catch (error) {
    console.error("Error verifying Google token:", error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  googleAuthTokenVerify
};