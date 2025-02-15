const axios = require("axios");
const Credentials = require("../../models/credentials");
const Response = require("../../helpers/response");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../helpers/constant");
const { handleException } = require("../../helpers/exception");

const manualConnect = async (req, res) => {
  const { logger } = req;
  try {
    // Destructure required fields from the request body
    const { store, apiKey, apiSecret, accessToken } = req.body;

    // Validate that all fields are provided
    if (!store || !apiKey || !apiSecret || !accessToken) {
      return Response.error({
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: "All fields (store, apiKey, apiSecret, accessToken) are required",
      });
    }

    // Look for an existing credentials document for this Shopify store
    let shopifyCred = await Credentials.findOne({
      platform: "shopify",
      "shopify.shop": store,
    });

    // If not found, create a new credentials document
    if (!shopifyCred) {
      shopifyCred = new Credentials({
        platform: "shopify",
        userId: req.userId, // Assumes req.userId is set by your authentication middleware
        shopify: {
          shop: store,
          accessToken: accessToken,
          appInstalled: false,
        },
      });
    }

    // Update the credentials with the submitted data
    shopifyCred.userId = req.userId;
    shopifyCred.email = req.user?.email; // Assumes req.user is populated
    shopifyCred.shopify = {
      ...shopifyCred.shopify,
      shop: store,
      accessToken,
      appKey: apiKey,
      appSecret: apiSecret,
      appInstalled: false, // Default to false until the credentials are verified
    };

    // Test the Shopify credentials by calling the Shopify Admin API
    let appInstalled = false;
    try {
      const testResponse = await axios.get(
        `https://${store}/admin/api/2023-01/shop.json`,
        {
          headers: {
            "X-Shopify-Access-Token": accessToken,
          },
        }
      );
      // If the request is successful (HTTP 200), the credentials are valid
      if (testResponse.status === 200) {
        appInstalled = true;
      }
    } catch (error) {
      // If the test request fails, appInstalled remains false
    }

    // Update the installation status in the credentials document
    shopifyCred.shopify.appInstalled = appInstalled;

    // Save the document
    await shopifyCred.save();

    // If the credentials test failed, respond with an error
    if (!appInstalled) {
      return Response.error({
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.SHOP_NOT_INSTALLED, // e.g., "Could not validate your Shopify credentials"
      });
    }

    // Respond with success if the Shopify credentials are valid
    return Response.success({
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: { shopifyAppInstalled: true },
    });
  } catch (error) {
    // Handle any unexpected errors
    return handleException(logger, res, error);
  }
};

module.exports = { manualConnect };
