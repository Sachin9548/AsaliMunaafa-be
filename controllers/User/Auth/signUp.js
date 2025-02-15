const User = require("../../../models/user");
const Credentials = require("../../../models/credentials");
const SignupValidation = require("../../../helpers/joi-validation");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../../helpers/constant");
const bcrypt = require("bcrypt");

/**
 * Register a new user with email and password
 */
const signUp = async (req, res) => {
  const { logger } = req;
  try {
    const { email, password } = req.body;

    const { error } = SignupValidation.registerWithEmailAndPassword({
      email,
      password,
    });
    if (error) {
      const obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: error.details[0].message,
      };
      return Response.error(obj);
    }

    const userEmailExist = await User.findOne({
      email: email,
    });
    if (userEmailExist) {
      const obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.ACCOUNT_EXISTS,
      };
      return Response.error(obj);
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const { _id } = await User.create({
      email: email,
      password: passwordHash,
    });

    await Credentials.findOneAndUpdate(
      { email },
      { userId: _id },
      { new: true }
    );

    const obj = {
      res,
      status: STATUS_CODE.CREATED,
      msg: INFO_MSGS.SUCCESSFUL_REGISTER,
    };
    return Response.success(obj);
  } catch (error) {
    console.log("errordgvdfg--->", error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  signUp,
};
