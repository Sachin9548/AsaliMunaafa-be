const User = require("../../../models/user");
const Credentials = require("../../../models/credentials");
const BusinessDetails = require("../../../models/businessDetails");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const Response = require("../../../helpers/response");
const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../../helpers/constant");
const { encrypt, decrypt } = require("../../../helpers/encrypt-decrypt");
const { handleException } = require("../../../helpers/exception");
const { appInstalled } = require("../../../utils/checkShopifyAppInstalled");
const LoginValidation = require("../../../helpers/joi-validation");
require("dotenv").config();

/**
 * Generate JWT Token
 */
const generateJWTToken = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { encryptUser, expiresIn, type, role } = payload;
      const token = jwt.sign(
        { userId: encryptUser, type, role },
        process.env.USER_ACCESS_TOKEN,
        { expiresIn }
      );
      resolve(token);
    } catch (error) {
      reject(error.message);
    }
  });
};

/**
 * Login
 */
const logIn = async (req, res) => {
  const { logger } = req;
  try {
    let { ensh } = req.query;

    const { emailOrPhone, password, registrationType } = req.body;
    if (registrationType !== "Google") {
      if (!emailOrPhone || !password) {
        const message = !emailOrPhone
          ? `Email/Mobile ${ERROR_MSGS.KEY_REQUIRED}`
          : `Password ${ERROR_MSGS.KEY_REQUIRED}`;
        let obj = {
          res,
          status: STATUS_CODE.BAD_REQUEST,
          msg: message,
        };
        return Response.error(obj);
      }
    }

    const type = await LoginValidation.checkEmailOrPhone(req.body);
    if (type === "unknown") {
      let obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_EMAIL_OR_MOBILE,
      };
      return Response.error(obj);
    }

    const payload =
      type === "mobile" ? { mobile: emailOrPhone } : { email: emailOrPhone };

    let userInfo = await User.aggregate([
      { $match: payload },
      {
        $lookup: {
          from: "businessdetails",
          localField: "_id",
          foreignField: "userId",
          as: "businessDetails",
        },
      },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          mobile: 1,
          password: 1,
          registrationType: 1,
          websiteUrl: 1,
          aboutAsaliMunafaa: 1,
          sellingProduct: 1,
          monthlyRevenue: 1,
          goal: 1,
          futureRevenue: 1,
          onboardingSteps: 1,
          businessDetailsSteps: {
            $arrayElemAt: ["$businessDetails.businessDetailsSteps", 0],
          },
        },
      },
    ]);

    if (!userInfo || userInfo.length === 0) {
      let obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.ACCOUNT_NOT_FOUND,
      };
      return Response.error(obj);
    }

    userInfo = userInfo[0];
    userInfo.businessDetailsSteps = userInfo.businessDetailsSteps || {
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
    };

    if (ensh) {
      ensh = ensh.replace(/ /g, "+");
      const decodedEnsh = decodeURIComponent(ensh);
      const decryptShop = decrypt(
        decodedEnsh,
        process.env.SHOPIFY_SESSION_SECRET
      );
      const shop = decryptShop;
      const getCrede = await Credentials.findOne({
        platform: "shopify",
        "shopify.shop": shop,
      });

      const appStatus = await appInstalled(
        shop,
        getCrede,
        userInfo._id,
        payload.email
      );
      await Credentials.findByIdAndUpdate(
        { _id: appStatus.credeId },
        appStatus,
        { new: true }
      );
    } else {
      let getCrede = await Credentials.findOne({
        email: payload.email,
        platform: "shopify",
      });
      if (getCrede) {
        const appStatus = await appInstalled(
          getCrede.shopify.shop,
          getCrede,
          userInfo._id,
          payload.email
        );

        await Credentials.findByIdAndUpdate(
          { _id: appStatus.credeId },
          appStatus,
          { new: true }
        );
      }
    }

    if (registrationType !== "Google") {
      if (!bcrypt.compareSync(password, userInfo.password)) {
        let obj = {
          res,
          status: STATUS_CODE.BAD_REQUEST,
          msg: ERROR_MSGS.INVALID_LOGIN,
        };
        return Response.error(obj);
      }
    }

    const encryptUser = encrypt(userInfo._id, process.env.USER_ENCRYPTION_KEY);
    const clientIp =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const data = await commonAuth(encryptUser, clientIp);

    await User.findByIdAndUpdate(
      userInfo._id,
      {
        lastLogin: new Date(),
        "token.token": data.accessToken,
        "token.type": "Access",
        "token.createdAt": new Date(),
      },
      { new: true }
    );

    let result = {
      fullName: userInfo.fullName,
      email: userInfo.email,
      mobile: userInfo.mobile,
      websiteUrl: userInfo.websiteUrl,
      aboutAsaliMunafaa: userInfo.aboutAsaliMunafaa,
      sellingProduct: userInfo.sellingProduct,
      monthlyRevenue: userInfo.monthlyRevenue,
      goal: userInfo.goal,
      futureRevenue: userInfo.futureRevenue,
      onboardingSteps: userInfo.onboardingSteps,
      businessDetailsSteps: userInfo.businessDetailsSteps,
      ...data,
    };
    let obj = {
      res,
      msg: INFO_MSGS.SUCCESSFUL_LOGIN,
      status: STATUS_CODE.OK,
      data: result,
    };
    return Response.success(obj);
  } catch (error) {
    console.log("Login Error : ", error);
    return handleException(logger, res, error);
  }
};

/**
 * Common Auth function for 2FA checking and JWT token generation
 */
const commonAuth = (encryptUser) =>
  new Promise(async (resolve, reject) => {
    try {
      const payload = {
        expiresIn: process.env.USER_ACCESS_TIME,
        encryptUser,
        type: "Access",
        role: "Admin",
      };
      const accessToken = await generateJWTToken(payload);
      const data = {
        accessToken,
      };
      resolve(data);
    } catch (error) {
      console.log("common Auth Log :", error);
      reject(error);
    }
  });

module.exports = {
  logIn,
  generateJWTToken,
  commonAuth,
};
