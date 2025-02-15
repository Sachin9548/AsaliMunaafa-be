const { STATUS_CODE, INFO_MSGS } = require("../../../helpers/constant");
const Response = require("../../../helpers/response");
require("dotenv").config();
const { SNAPCHAT_CLIENT_ID, SNAPCHAT_SECRET_ID, SNAPCHAT_REDIRECT_URI } = process.env


const generateAuthUrl = async (req, res) => {
    try {
        let { userId } = req;
        const { snapUserId } = req.query;
        const authUrl = `https://accounts.snapchat.com/login/oauth2/authorize?response_type=code&client_id=${SNAPCHAT_CLIENT_ID}&redirect_uri=${SNAPCHAT_REDIRECT_URI}&scope=snapchat-marketing-api&state=${snapUserId}`;

        const obj = {
            res,
            status: STATUS_CODE.OK,
            msg: INFO_MSGS.OK,
            data: authUrl,
        };
        return Response.success(obj);;
    } catch (error) {
        console.error('Error while generating auth URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { generateAuthUrl };
