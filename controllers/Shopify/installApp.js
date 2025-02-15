const crypto = require("crypto");
const axios = require("axios");
const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../helpers/constant");
const Credential = require("../../models/credentials");
const { handleException } = require("../../helpers/exception");
const Response = require("../../helpers/response");
require("dotenv").config();
const { SHOPIFY_API_KEY, SHOPIFY_SCOPES, SHOPIFY_REDIRECT_URI } = process.env;

const installApp = async (req, res) => {
  const { logger } = req;
  try {
    const shop = req.query.shop;
    if (!shop) {
      const obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: `shop ${ERROR_MSGS.KEY_REQUIRED}`,
      };
      return Response.error(obj);
    }

    const getCrede = await Credential.findOne({
      platform: "shopify",
      "shopify.shop": shop,
    });
    if (getCrede) {
      try {
        const response = await axios.get(
          `https://${shop}/admin/api/2021-01/shop.json`,
          {
            headers: {
              "X-Shopify-Access-Token": getCrede.shopify.accessToken,
            },
          }
        );
        if (response?.status === 200) {
          console.log("App is installed");
          if (getCrede.userId != null) {
            if (req.userId != getCrede.userId) {
              const obj = {
                res,
                status: STATUS_CODE.BAD_REQUEST,
                msg: ERROR_MSGS.SHOP_ALREADY_USED,
              };
              return Response.error(obj);
            }
          }
          getCrede.userId = req.userId;
          getCrede.shopify.appInstalled = true;
          getCrede.save();
          const obj = {
            res,
            status: STATUS_CODE.OK,
            msg: INFO_MSGS.SUCCESS,
            data: "https://asalimunaafa.com/marketing-platform",
          };
          return Response.success(obj);
        } else {
          console.log("App is not installed");
          const obj = {
            res,
            status: STATUS_CODE.BAD_REQUEST,
            msg: ERROR_MSGS.SHOP_NOT_INSTALLED,
          };
          return Response.error(obj);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const obj = {
            res,
            status: STATUS_CODE.BAD_REQUEST,
            msg: ERROR_MSGS.SHOP_NOT_INSTALLED,
          };
          return Response.error(obj);
        }
        console.error("Error checking app installation:", error.message);
      }
    } else {
      const credePayload = {
        platform: "shopify",
        userId: req.userId,
        "shopify.shop": shop,
        "shopify.appInstalled": false,
      };
      await Credential.create(credePayload);
    }

    const state = Buffer.from(
      JSON.stringify({ state: crypto.randomBytes(16).toString("hex") })
    ).toString("base64");
    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SHOPIFY_SCOPES}&state=${state}&redirect_uri=${SHOPIFY_REDIRECT_URI}`;

    // res.redirect(installUrl);
    const obj = {
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: installUrl,
    };
    return Response.success(obj);
  } catch (error) {
    console.error("error:", error);
    return handleException(logger, res, error);
  }
};

module.exports = { installApp };
