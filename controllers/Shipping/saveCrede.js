const Credentials = require("../../models/credentials");
const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../helpers/constant");
const { handleException } = require("../../helpers/exception");
const Response = require("../../helpers/response");
const { ObjectId } = require("mongoose").Types;

const create = async (req, res) => {
  const { logger, userId } = req;
  try {
    const { platform, email, password, apiToken, baseUrl, apiKey, secretKey } = req.body;
    let payload;
    const fetchCrede = await Credentials.findOne({
      platform: platform,
      userId: new ObjectId(userId),
    });

    if (platform === "shiprocket") {
      payload = {
        userId,
        platform,
        shiprocket: {
          email,
          password,
          generatedDate: new Date().toISOString(),
        },
      };
    } else if (platform === "delhivery") {
      payload = {
        userId,
        platform,
        delhivery: {
          apiToken,
          generatedDate: new Date().toISOString(),
        },
      };
    } else if (platform === "ithinklogistics") {
      payload = {
        userId,
        platform,
        ithinklogistics: {
          baseUrl,
          apiKey,
          secretKey,
          generatedDate: new Date().toISOString(),
        },
      };
    }

    if (!fetchCrede) {
      // Create new credentials record
      const saveData = await Credentials.create(payload);
      const statusCode = saveData ? STATUS_CODE.CREATED : STATUS_CODE.BAD_REQUEST;
      const message = saveData ? INFO_MSGS.CREATED_SUCCESSFULLY : ERROR_MSGS.CREATE_ERR;
      return Response[saveData ? "success" : "error"]({
        req,
        res,
        status: statusCode,
        msg: message,
        data: saveData || null,
      });
    } else {
      // Update existing credentials record
      const updateData = await Credentials.findByIdAndUpdate(
        fetchCrede._id,
        payload,
        { new: true }
      );
      const statusCode = updateData ? STATUS_CODE.OK : STATUS_CODE.BAD_REQUEST;
      const message = updateData ? INFO_MSGS.UPDATED_SUCCESSFULLY : ERROR_MSGS.UPDATE_ERR;
      return Response[updateData ? "success" : "error"]({
        req,
        res,
        status: statusCode,
        msg: message,
        data: updateData || null,
      });
    }
  } catch (error) {
    console.error("Error saving credentials:", error);
    return handleException(logger, res, error);
  }
};

module.exports = { create };
