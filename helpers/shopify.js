const Credentials = require("../models/credentials");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../helpers/constant");
const { handleException } = require("../helpers/exception");
const Response = require("../helpers/response");
const Shopify = require("shopify-api-node");
const { ObjectId } = require("mongoose").Types;

const shopifyCrede = async (req, res) => {
  const { logger } = req;
  try {
    const { userId } = req;
    let getCrede = await Credentials.findOne({ userId: new ObjectId(userId), platform: "shopify" })
    if (!getCrede) {
      const obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.DATA_NOT_FOUND,
      };
      return Response.error(obj);
    }
    console.log("getCrede",getCrede);
    let { accessToken, shop } = getCrede.shopify;
console.log("accessToken",accessToken);
console.log("accessToken",shop);
    if (!accessToken || !shop) {
      const obj = {
        res,
        status: STATUS_CODE.UN_AUTHORIZED,
        msg: ERROR_MSGS.AUTHORIZATION_FAILED,
      };
      return Response.error(obj);
    }
    const shopify = new Shopify({
      shopName: shop,
      accessToken: accessToken,
    });
    return shopify
  } catch (error) {
    console.error('error:', error);
    return handleException(logger, res, error);
  }
};

module.exports = { shopifyCrede };