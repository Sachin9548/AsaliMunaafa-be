const GetInTouch = require('../../../models/getInTouch');
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const { paginationResponse } = require("../../../utils/paginationFormate")
const Response = require("../../../helpers/response");

const getAll = async (req, res) => {
  const { logger } = req;
  try {
    let { keyWord, page, limit, sortBy } = req.query;
    let qry = {}

    if (keyWord) {
      qry = {
        $or: [
          { firstName: { $regex: keyWord, $options: "i" } },
          { email: { $regex: keyWord, $options: "i" } },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: { $toLong: "$mobile" } },
                regex: keyWord,
              },
            },
          },
        ]
      };
    }

    sortBy = sortBy === "recent" ? { createdAt: -1 } : { createdAt: 1 };

    offset = page || 1;
    limit = limit || 10;
    const skip = limit * (offset - 1);
    const getData = await GetInTouch.aggregate([
      { $match: qry },
      { $sort: sortBy },
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