const Response = require("../../helpers/response");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../helpers/constant");
const { handleException } = require("../../helpers/exception");

const auth = async (req, res) => {
    const { logger } = req;
    try {

        // // Create the response object
        // let api = new WooCommerceRestApi({
        //     url: 'https://asalimunaafa.com/', // Your store URL
        //     consumerKey: 'ck_e6467d609c5fb22a26299809037cd159ff2ec22d',
        //     consumerSecret: 'cs_e8991603c11f0ab3afad805e22fe921652e4f495',
        //     version: 'wc/v3' // WooCommerce WP REST API version
        // });

        // api.post("products", {
        //     name: "Premium Quality", // See more in https://woocommerce.github.io/woocommerce-rest-api-docs/#product-properties
        //     type: "simple",
        //     regular_price: "21.99",
        // })
        //     .then((response) => {
        //         // Successful request
        //         console.log("Response Status:", response.status);
        //         console.log("Response Headers:", response.headers);
        //         console.log("Response Data:", response.data);
        //     })
        //     .catch((error) => {
        //         // Invalid request, for 4xx and 5xx statuses
        //         console.log("Err Response Status:", error.response.status);
        //         console.log("Err Response Headers:", error.response.headers);
        //         console.log("Err Response Data:", error.response.data);
        //     })
        //     .finally(() => {
        //         // Always executed.
        //     });
        // let result = await api.get("products", {
        //     per_page: 20, // 20 products per page
        // })
        // const obj = {
        //     res,
        //     status: STATUS_CODE.CREATED,
        //     msg: '',
        //     data: result};

        // // Return the success response
        // return Response.success(obj);

        const querystring = require('querystring');

        // const store_url = 'https://asalimunaafa.com/';
        const store_url = 'https://woo-mysteriously-cyber-fun.wpcomstaging.com/';
        const endpoint = '/wc-auth/v1/authorize';
        const params = {
            app_name: 'My App Name',
            scope: 'read_write',
            user_id: 123,
            return_url: 'https://asalimunaafa.com/',
            callback_url: 'https://asalimunaafa.com/'
            // return_url: 'http://app.com/return-page',
            // callback_url: 'https://app.com/callback-endpoint'
        };
        const query_string = querystring.stringify(params).replace(/%20/g, '+');

        console.log(store_url + endpoint + '?' + query_string);
    } catch (error) {
        console.log("error--->", error);
        return handleException(logger, res, error);
    }
};

module.exports = {
    auth
}