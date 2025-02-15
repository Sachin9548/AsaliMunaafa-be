const User = require("../../../models/user");
const Credentials = require("../../../models/credentials");
const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const { appInstalled } = require("../../../utils/checkShopifyAppInstalled");
const { ObjectId } = require("mongoose").Types;

const getUser = async (req, res) => {
  const { logger } = req;
  try {
    const { userId } = req;

    // Correct use of 'new' with ObjectId
    const userData = await User.aggregate([
      { $match: { _id: new ObjectId(userId) } },
      {
        $project: {
          __v: 0,
          role: 0,
          token: 0,
          password: 0,
          forgotPassword: 0,
        },
      },
    ]);

    if (!userData.length) {
      return Response.error({
        req,
        res,
        status: STATUS_CODE.RESOURCE_NOT_FOUND,
        msg: ERROR_MSGS.DATA_NOT_FOUND,
      });
    }

    const user = userData[0];

    // Fetch all credentials for the user
    const credentials = await Credentials.find({
      userId: new ObjectId(userId),
    });

    // Handle Shopify credentials
    const shopifyCreds = credentials.find(
      (cred) => cred.platform === "shopify"
    );
    if (shopifyCreds) {
      const appStatus = await appInstalled(
        shopifyCreds.shopify.shop,
        shopifyCreds,
        userId,
        shopifyCreds.email
      );
      await Credentials.findByIdAndUpdate(shopifyCreds._id, appStatus, {
        new: true,
      });
      user.shopifyAppInstalled = appStatus["shopify.appInstalled"];
    } else {
      user.shopifyAppInstalled = false;
    }

    // Handle Google credentials
    const googleCreds = credentials.find((cred) => cred.platform === "google");
    user.googleConnected = googleCreds?.google?.googleConnected || false;

    return Response.success({
      req,
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: user,
    });
  } catch (error) {
    console.error("Error:", error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  getUser,
};
