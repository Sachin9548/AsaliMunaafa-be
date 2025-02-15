const Credentials = require("../../../models/credentials");
const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const axios = require("axios");
require("dotenv").config();

const generateToken = async (req, res) => {
  const { logger, userId } = req;  
  const { email, password } = req.body;
  console.log("Generated token request hit");

  // Validate required parameters
  if (!email || !password) {
    return Response.error({
      res,
      status: STATUS_CODE.BAD_REQUEST,
      msg: "Email and password are required.",
    });
  }
  try {
    // 1. Make login request to Shiprocket API
    const url = "https://apiv2.shiprocket.in/v1/external/auth/login";
    const payload = { email, password };
    const headers = { "Content-Type": "application/json" };

    const response = await axios.post(url, payload, { headers });
    const { token, created_at } = response.data;

    // 2. Verify the generated token by making an authenticated call.
    // Here we call an endpoint (e.g., /orders) that should return a valid response code if the token is valid.
    const verifyUrl = "https://apiv2.shiprocket.in/v1/external/orders";
    const verifyResponse = await axios.get(verifyUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    console.log("Verify response:", verifyResponse.data);

    // Check if the verifyResponse data contains a valid code.
    // (Adjust this check based on the actual structure of Shiprocket's response.)
    if (!verifyResponse.data) {
        return Response.error({
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: verifyResponse.data.msg || "Token verification failed.",
      });
    }

    // 3. Create or update the Shiprocket credentials in the database
    let credentialRecord = await Credentials.findOne({ platform: "shiprocket", userId });

    // Prepare the data to be stored/updated
    const shiprocketData = {
      email,
      password,
      generatedDate: new Date().toISOString(),
      authToken: {
        token,
        generatedDate: created_at ? new Date(created_at) : new Date(),
      },
    };

    if (!credentialRecord) {
      // Create a new credentials record if one does not exist
      credentialRecord = new Credentials({
        userId,
        platform: "shiprocket",
        shiprocket: shiprocketData,
      });
      await credentialRecord.save();
    } else {
      // Update existing credentials record with new login details and token
      credentialRecord.shiprocket = shiprocketData;
      await credentialRecord.save();
    }

    // 4. Return the token details in the response
    const responseData = {
      token,
      generatedDate: shiprocketData.authToken.generatedDate,
    };

    return Response.success({
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: responseData,
    });
  } catch (error) {
    console.error("Error generating token:", error.message);
    return Response.error({
      res,
      status: error.response ? error.response.status : STATUS_CODE.BAD_REQUEST,
      msg: error.response ? error.response.data : error.message,
      data: error,
    });
  }
};

module.exports = { generateToken };
