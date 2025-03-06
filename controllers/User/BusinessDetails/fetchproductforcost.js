const axios = require("axios");
const { ObjectId } = require("mongoose").Types;
const Credentials = require("../../../models/credentials");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");

const fetchProducts = async (req, res) => {
  const { logger, userId } = req;
  try {
    // Retrieve the user's Shopify credentials from the database.
    const getCrede = await Credentials.findOne({
      userId: new ObjectId(userId),
      platform: "shopify",
    });
    if (!getCrede) {
      return Response.error({
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.DATA_NOT_FOUND,
      });
    }

    // Destructure access token and shop name from the credentials.
    const { accessToken, shop } = getCrede.shopify;
    if (!accessToken || !shop) {
      return Response.error({
        res,
        status: STATUS_CODE.UN_AUTHORIZED,
        msg: ERROR_MSGS.AUTHORIZATION_FAILED,
      });
    }

    // Define API version and construct base URL.
    const apiVersion = "2023-01"; // Adjust the API version as needed.
    const baseURL = `https://${shop}/admin/api/${apiVersion}`;

    // Create an Axios instance with the credentials.
    const shopifyClient = axios.create({
      baseURL,
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    // Fetch products from Shopify.
    const response = await shopifyClient.get("/products.json");

    return Response.success({
      req,
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: { products: response.data.products },
    });
  } catch (error) {
    console.error(
      "Error fetching products from Shopify:",
      error.response ? error.response.data : error.message
    );
    return handleException(logger, res, error);
  }
};

module.exports = { fetchProducts };
