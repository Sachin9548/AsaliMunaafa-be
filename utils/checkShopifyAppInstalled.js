const axios = require("axios");

const appInstalled = async (shop, getCrede, userId, email) => {
  try {
    const response = await axios.get(
      `https://${shop}/admin/api/2024-01/shop.json`,
      {
        headers: {
          "X-Shopify-Access-Token": getCrede.shopify.accessToken,
        },
      }
    );

    if (response.status === 200) {
      console.log("App is installed");
      return {
        email,
        userId,
        credeId: getCrede._id,
        "shopify.appInstalled": true,
        "shopify.shop": shop,
      };
    } else {
      console.log("App is not installed");
      return {
        email,
        userId,
        credeId: getCrede._id,
        "shopify.appInstalled": false,
        "shopify.shop": shop,
      };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("Invalid access token, your app is not installed");
      return {
        email,
        userId,
        credeId: getCrede._id,
        "shopify.appInstalled": false,
        "shopify.shop": shop,
      };
    } else {
      console.error("Error checking app installation:", error.message);
      throw new Error(error.message);
    }
  }
};

module.exports = { appInstalled };
