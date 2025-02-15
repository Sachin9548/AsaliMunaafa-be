const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const axios = require('axios');
const qs = require('qs');
require("dotenv").config();

const { SNAPCHAT_CLIENT_ID, SNAPCHAT_SECRET_ID, SNAPCHAT_REDIRECT_URI } = process.env

const snapCallback = async (req, res) => {
    const { logger } = req;
    try {
        const { code } = req.query;

        // Exchange the authorization code for an access token
        const tokenUrl = 'https://accounts.snapchat.com/login/oauth2/access_token';
        const data = qs.stringify({
            client_id: SNAPCHAT_CLIENT_ID,
            client_secret: SNAPCHAT_SECRET_ID,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: SNAPCHAT_REDIRECT_URI,
        });

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const response = await axios.post(tokenUrl, data, { headers });
        const accessToken = response.data.access_token;

        const obj = {
            res,
            status: STATUS_CODE.OK,
            msg: INFO_MSGS.OK,
            data: accessToken
        };
        return Response.success(obj);
    } catch (error) {
        console.error('Error while listing products:', error);
        return handleException(logger, res, error);
    }
};
module.exports = { snapCallback };