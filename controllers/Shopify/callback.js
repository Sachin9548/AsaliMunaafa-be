const crypto = require("crypto");
const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../helpers/constant");
const { encrypt } = require("../../helpers/encrypt-decrypt");
const { handleException } = require("../../helpers/exception");
const Response = require("../../helpers/response");
const Credential = require("../../models/credentials");
const axios = require("axios");
require("dotenv").config();
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET } = process.env;

const callback = async (req, res) => {
  const { logger } = req;
  try {
    const { shop, hmac, code, state } = req.query;

    // Validate HMAC
    const map = Object.assign({}, req.query);
    delete map["hmac"];
    delete map["signature"];

    // Create message for HMAC generation
    const message = Object.keys(map)
      .sort()
      .map((key) => `${key}=${map[key]}`)
      .join("&");

    const generatedHash = crypto
      .createHmac("sha256", SHOPIFY_API_SECRET)
      .update(message)
      .digest("hex");

    if (generatedHash !== hmac) {
      return Response.error({
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: "HMAC validation failed",
      });
    }

    // Exchange code for access token
    const accessTokenResponse = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: SHOPIFY_API_KEY,
        client_secret: SHOPIFY_API_SECRET,
        code,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const response = accessTokenResponse.data;
    const shopDetailsResponse = await axios.get(
      `https://${shop}/admin/api/2021-01/shop.json`,
      {
        headers: {
          "X-Shopify-Access-Token": response.access_token,
        },
      }
    );

    const shopDetails = shopDetailsResponse.data.shop;
    const shopEmail = shopDetails.email;

    const fetchCredentials = await Credential.findOne({
      platform: "shopify",
      "shopify.shop": shop,
    });
    const encryptShop = await encrypt(shop, process.env.SHOPIFY_SESSION_SECRET);

    if (fetchCredentials) {
      fetchCredentials.email = shopEmail;
      fetchCredentials.shopify.accessToken = response.access_token;
      fetchCredentials.shopify.state = state;
      fetchCredentials.shopify.appInstalled = true;
      fetchCredentials.shopify.generatedDate = new Date();
      await fetchCredentials.save();

      return res.redirect(`https://asalimunaafa.com/login?ensh=${encryptShop}`);
    } else {
      const credePayload = {
        platform: "shopify",
        email: shopEmail,
        "shopify.shop": shop,
        "shopify.appInstalled": true,
        "shopify.state": state,
        "shopify.generatedDate": new Date(),
        "shopify.accessToken": response.access_token,
      };
      await Credential.create(credePayload);
    }
    return res.redirect(`https://asalimunaafa.com/login?ensh=${encryptShop}`);
    // return res.redirect("https://asalimunaafa.com/marketing-platform");
  } catch (error) {
    console.error("Error while handling Shopify callback:", error);
    return handleException(logger, res, error);
  }
};

module.exports = { callback };
