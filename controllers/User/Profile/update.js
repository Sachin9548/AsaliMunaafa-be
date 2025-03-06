const User = require("../../../models/user");
const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const SignupValidation = require("../../../helpers/joi-validation");
const { ObjectId } = require("mongoose").Types;

const update = async (req, res) => {
  console.log("req.body:c request hit");
  const { logger } = req;
  try {
    const { userId } = req;
    const { email, password, mobile, role } = req.body;
console.log("req.body:",req.body);
    if (email || password || role) {
      let errorMsg;
      if (email) errorMsg = `Email ${ERROR_MSGS.NOT_EDITABLE}`;
      else if (password) errorMsg = `Password ${ERROR_MSGS.NOT_EDITABLE}`;
      else if (role) errorMsg = `Role ${ERROR_MSGS.NOT_EDITABLE}`;

      const obj = { res, status: STATUS_CODE.BAD_REQUEST, msg: errorMsg };
      return Response.error(obj);
    }

    // if (mobile) {
    //   const { error } = SignupValidation.mobileVerification({ mobile });
    //   if (error) {
    //     const obj = {
    //       res,
    //       status: STATUS_CODE.BAD_REQUEST,
    //       msg: error.details[0].message,
    //     };
    //     return Response.error(obj);
    //   }
    // }

    const updateData = await User.findByIdAndUpdate(
      { _id: new ObjectId(userId) },
      req.body,
      { new: true }
    );


    console.log("updateData:", updateData);

    const statusCode = updateData ? STATUS_CODE.OK : STATUS_CODE.BAD_REQUEST;
    const message = updateData
      ? INFO_MSGS.UPDATED_SUCCESSFULLY
      : ERROR_MSGS.UPDATE_ERR;

    let newData = {
      fullName: updateData.fullName,
      email: updateData.email,
      mobile: updateData.mobile,
      websiteUrl: updateData.websiteUrl,
      registrationType: updateData.registrationType,
      aboutAsaliMunafaa: updateData.aboutAsaliMunafaa,
      sellingProduct: updateData.sellingProduct,
      monthlyRevenue: updateData.monthlyRevenue,
      goal: updateData.goal,
      futureRevenue: updateData.futureRevenue,
    };
    console.log("newData:", newData);

    return Response[statusCode === STATUS_CODE.OK ? "success" : "error"]({
      req,
      res,
      status: statusCode,
      msg: message,
      data: newData,
    });
  } catch (error) {
    console.error("error:", error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  update,
};
