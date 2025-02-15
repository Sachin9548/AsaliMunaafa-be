const BusinessDetails = require('../../../models/businessDetails');
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const { paginationResponse } = require("../../../utils/paginationFormate")
const Response = require("../../../helpers/response");

const getAll = async (req, res) => {
  const { logger } = req;
  try {
    let { page, limit, sortBy } = req.query;

    sortBy = sortBy === "recent" ? { createdAt: -1 } : { createdAt: 1 };

    offset = page || 1;
    limit = limit || 10;
    const skip = limit * (offset - 1);

    const getData = await BusinessDetails.aggregate([
      { $sort: sortBy },
      {
        $lookup: {
          from: "users",
          let: { userIds: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$userIds"]
                }
              }
            },
            {
              $project: {
                password: 0,
                forgotPassword: 0,
                token: 0,
                __v: 0,
                lastLogin: 0,
                createdAt: 0,
                updatedAt: 0,
                role: 0,
              }
            }
          ],
          as: "userData"
        }
      },

      {
        $facet: {
          paginatedResult: [
            { $skip: skip },
            { $limit: parseInt(limit) },
            {
              $project: {
                __v: 0,
              },
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      }
    ]);

    const result = getData[0];
    let response = await paginationResponse(req, res, offset, limit, result)

    const statusCode = response.response.length > 0 ? STATUS_CODE.OK : STATUS_CODE.OK;
    const message = response.response.length > 0 ? INFO_MSGS.SUCCESS : ERROR_MSGS.DATA_NOT_FOUND;

    return Response[statusCode === STATUS_CODE.OK ? 'success' : 'error']({
      req,
      res,
      status: statusCode,
      msg: message,
      data: response.response.length > 0 ? { Response: response } : { Response: [] }
    });
  } catch (error) {
    console.error("error-->", error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  getAll
};