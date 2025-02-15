const GoogleAccounts = require("../../../models/googleAccounts");
const Credentials = require("../../../models/credentials");
const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const { ObjectId } = require("mongoose").Types;
const Response = require("../../../helpers/response");
require("dotenv").config();

const manageAccounts = async (req, res) => {
  const { logger } = req;
  try {
    const data = req.body;

    if (!data || data.length === 0) {
      const obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.BODY_EMPTY,
      };

      return Response.error(obj);
    }

    const operations = data.map((item) => ({
      updateOne: {
        filter: { userId: req.userId, customerId: item.customerId },
        update: { $set: { ...item, userId: req.userId } },
        upsert: true,
      },
    }));

    const insertData = await GoogleAccounts.bulkWrite(operations);

    await Credentials.findOneAndUpdate(
      { userId: new ObjectId(req.userId) },
      { "google.googleConnected": true },
      { new: true }
    );

    const obj = {
      res,
      status: STATUS_CODE.CREATED,
      msg: INFO_MSGS.CREATED_SUCCESSFULLY,
      data: insertData,
    };
    return Response.success(obj);
  } catch (error) {
    console.error("Error managing Google accounts:", error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  manageAccounts,
};
