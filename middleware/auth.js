const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Response = require("../helpers/response");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../helpers/constant");
const { handleException } = require("../helpers/exception");
const { decrypt } = require("../helpers/encrypt-decrypt");

//- For User Token Decode
const userAuth = async (req, res, next) => {
  const { logger } = req;
  try {
    let token =
      req.body.token ||
      req.query.token ||
      req.headers["x-auth-token"] ||
      req.headers["authorization"];

    if (!token || token.length == 0 || token.toString() === "null") {
      const obj = {
        res,
        status: STATUS_CODE.UN_AUTHORIZED,
        msg: ERROR_MSGS.TOKEN_MISSING,
      };
      return Response.error(obj);
    }

    if (!token.startsWith("Bearer ")) {
      const obj = {
        res,
        status: STATUS_CODE.UN_AUTHORIZED,
        msg: ERROR_MSGS.INVALID_TOKEN_FORMAT,
      };
      return Response.error(obj);
    } 

    // Remove Bearer from string
    token = token.slice(7, token.length).trimLeft();
    jwt.verify(token, process.env.USER_ACCESS_TOKEN, async (err, decoded) => {
      if (err) {
        const obj = {
          res,
          status: STATUS_CODE.UN_AUTHORIZED,
          msg: err,
        };
        return Response.error(obj);
      }
      req.userId = decrypt(decoded.userId, process.env.USER_ENCRYPTION_KEY);
      req.type = decoded.type;
      let checkUser = await User.findById({ _id: req.userId });
      if (checkUser && decoded.type !== checkUser.token.type) {
        const obj = {
          res,
          status: STATUS_CODE.UN_AUTHORIZED,
          msg: ERROR_MSGS.TOKEN_SESSION_EXPIRED,
        };
        return Response.error(obj);
      }
      if (!checkUser) {
        const obj = {
          res,
          status: STATUS_CODE.UN_AUTHORIZED,
          msg: ERROR_MSGS.UN_AUTHORIZED,
        };
        return Response.error(obj);
      }
      next();
    });
  } catch (error) {
    console.log("auth error", error);
    return handleException(logger, res, error);
  }
};

//- For Admin Token Decode
const adminAuth = async (req, res, next) => {
  const { logger } = req;
  try {
    let token =
      req.body.token ||
      req.query.token ||
      req.headers["x-auth-token"] ||
      req.headers["authorization"];
    if (!token || token.length == 0 || token.toString() === "null") {
      const obj = {
        res,
        status: STATUS_CODE.UN_AUTHORIZED,
        msg: ERROR_MSGS.TOKEN_MISSING,
      };
      return Response.error(obj);
    }

    if (!token.startsWith("Bearer ")) {
      const obj = {
        res,
        status: STATUS_CODE.UN_AUTHORIZED,
        msg: ERROR_MSGS.INVALID_TOKEN_FORMAT,
      };
      return Response.error(obj);
    }

    // Remove Bearer from string
    token = token.slice(7, token.length).trimLeft();
    jwt.verify(token, process.env.USER_ACCESS_TOKEN, async (err, decoded) => {
      if (err) {
        const obj = {
          res,
          status: STATUS_CODE.UN_AUTHORIZED,
          msg: err,
        };
        return Response.error(obj);
      }
      req.userId = decrypt(decoded.userId, process.env.USER_ENCRYPTION_KEY);
      req.type = decoded.type;
      req.role = decoded.role;

      if (req.role !== "Admin") {
        const obj = {
          res,
          status: STATUS_CODE.BAD_REQUEST,
          msg: ERROR_MSGS.PERMISSIONS_DENIED,
        };
        return Response.error(obj);
      }
      let checkUser = await User.findById({ _id: req.userId });
      if (decoded.type !== checkUser.token.type) {
        const obj = {
          res,
          status: STATUS_CODE.UN_AUTHORIZED,
          msg: ERROR_MSGS.TOKEN_SESSION_EXPIRED,
        };
        return Response.error(obj);
      }
      if (!checkUser) {
        const obj = {
          res,
          status: STATUS_CODE.UN_AUTHORIZED,
          msg: ERROR_MSGS.UN_AUTHORIZED,
        };
        return Response.error(obj);
      }
      next();
    });
  } catch (error) {
    console.log("auth error", error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  userAuth,
  adminAuth,
};
