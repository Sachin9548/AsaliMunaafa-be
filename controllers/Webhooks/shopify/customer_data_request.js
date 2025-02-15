const Response = require("../../../helpers/response");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const crypto = require("crypto");
require("dotenv").config();
const { SHOPIFY_API_SECRET } = process.env;

const customer_data_request = async (req, res) => {
    const { logger } = req;
    try {
        const { headers, body } = req;

        // Extract HMAC signature from request headers
        const hmacSignature = headers['x-shopify-hmac-sha256'];

        // Compute HMAC signature using the request body and your app's secret key
        const hmac = crypto.createHmac('sha256', SHOPIFY_API_SECRET);
        hmac.update(JSON.stringify(body));
        const computedSignature = hmac.digest('base64');

        // Compare computed HMAC signature with the signature from the request
        if (computedSignature === hmacSignature) {
            // HMAC signatures match, webhook is verified
            console.log('Webhook verified');
            // Process the webhook data
            // Your webhook handling logic here
            res.status(200).send('Webhook verified');
        } else {
            // HMAC signatures do not match, reject the webhook
            console.error('Webhook verification failed');
            res.status(403).send('Webhook verification failed');
        }
    } catch (error) {
        console.log("error--->", error);
        return handleException(logger, res, error);
    }
};

module.exports = {
    customer_data_request
}