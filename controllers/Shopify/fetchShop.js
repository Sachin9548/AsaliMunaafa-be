const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../helpers/constant");
const Credentials = require("../../models/credentials");
const { handleException } = require("../../helpers/exception");
const { appInstalled } = require("../../utils/checkShopifyAppInstalled");
const Response = require("../../helpers/response");
require("dotenv").config();

const fetchShop = async (req, res) => {
  const { logger } = req;
  try {
    const shop = req.query.shop;
    let shopifyAppInstalled;
    if (!shop) {
      const obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: `shop ${ERROR_MSGS.KEY_REQUIRED}`,
      };
      return Response.error(obj);
    }

    const getCrede = await Credentials.findOne({
      platform: "shopify",
      "shopify.shop": shop,
    });
    if (getCrede) {
      const appStatus = await appInstalled(
        getCrede.shopify.shop,
        getCrede,
        req.userId,
        getCrede.email
      );
      getCrede.userId = req.userId;
      getCrede.shopify.appInstalled = appStatus["shopify.appInstalled"];
      getCrede.save();
      shopifyAppInstalled = appStatus["shopify.appInstalled"];
    } else {
      const credePayload = {
        platform: "shopify",
        userId: req.userId,
        "shopify.shop": shop,
        "shopify.appInstalled": false,
      };
      await Credentials.create(credePayload);
      shopifyAppInstalled = false;
    }
    const obj = {
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: { shopifyAppInstalled },
    };
    return Response.success(obj);
  } catch (error) {
    console.error("error:", error);
    return handleException(logger, res, error);
  }
};

module.exports = { fetchShop };
