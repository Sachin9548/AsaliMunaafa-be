const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Response = require("../../../helpers/response");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { encrypt } = require("../../../helpers/encrypt-decrypt")
const { handleException } = require("../../../helpers/exception");
const LoginValidation = require("../../../helpers/joi-validation");
require('dotenv').config();

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
        const { error } = LoginValidation.adminLogin(req.body);
        if (error) {
            const obj = {
                res,
                status: STATUS_CODE.BAD_REQUEST,
                msg: error.details[0].message,
            };
            return Response.error(obj);
        }
        const { email, password } = req.body;
        const userInfo = await User.findOne({ email: email });

        if (userInfo.role !== "Admin") {
            const obj = {
                res,
                status: STATUS_CODE.BAD_REQUEST,
                msg: ERROR_MSGS.ADMIN_ACCESS_DENIED,
            };
            return Response.error(obj);
        }
        if (!userInfo) {
            const obj = {
                res,
                status: STATUS_CODE.BAD_REQUEST,
                msg: ERROR_MSGS.ACCOUNT_NOT_FOUND,
            };
            return Response.error(obj);
        }
        if (userInfo.registrationType !== "Email") {
            const obj = {
                res,
                status: STATUS_CODE.BAD_REQUEST,
                msg:
                    userInfo.registrationType === "Google"
                        ? ERROR_MSGS.LOGIN_WITH_GOOGLE
                        : ERROR_MSGS.LOGIN_WITH_FACEBOOK,
            };
            return Response.error(obj);
        }
        if (!bcrypt.compareSync(password, userInfo.password)) {
            const obj = {
                res,
                status: STATUS_CODE.BAD_REQUEST,
                msg: ERROR_MSGS.INVALID_LOGIN,
            };
            return Response.error(obj);
        }
        let key1 = process.env.USER_ENCRYPTION_KEY;
        const encryptUser = encrypt(userInfo._id, key1);
        const clientIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const data = await commonAuth(
            encryptUser,
            clientIp,
        );

        await User.findByIdAndUpdate(
            userInfo._id,
            {
                lastLogin: new Date(Date.now()),
                "token.token": data.accessToken,
                "token.type": "Access",
                "token.createdAt": new Date(Date.now()),
            },
            { new: true });
        const obj = {
            res,
            msg: INFO_MSGS.SUCCESSFUL_LOGIN,
            status: STATUS_CODE.OK,
            data,
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
const commonAuth = (encryptUser, ip) =>
    new Promise(async (resolve, reject) => {
        try {
            const payload = {
                expiresIn: process.env.USER_ACCESS_TIME,
                encryptUser,
                type: "Access",
                role: "Admin"
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