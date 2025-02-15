// controllers/shopifyController.js
const axios = require("axios");
const Credentials = require("../../models/credentials");
const Response = require("../../helpers/response");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../helpers/constant");
const { handleException } = require("../../helpers/exception");

/**
 * fetchShopifyOverview
 *  - Looks up the stored Shopify credentials for the authenticated user.
 *  - Calls Shopify’s orders API to retrieve orders.
 *  - Computes dynamic values such as total sales, order count, shipping spend, profit margin,
 *    order cancellations, RTO, gross profit, and net sales.
 *  - Returns the data in a structure the frontend expects.
 */
const fetchShopifyOverview = async (req, res) => {
  const { logger } = req;
  try {
    // Assumes your authentication middleware sets req.userId.
    const userId = req.userId;
    // Look up the stored Shopify credentials for this user.
    const shopifyCred = await Credentials.findOne({
      platform: "shopify",
      userId: userId,
    });
    if (!shopifyCred) {
      return Response.error({
        res,
        status: STATUS_CODE.NOT_FOUND,
        msg: "Shopify credentials not found",
      });
    }
    // console.log("shopifyCred data", shopifyCred);

    const store = shopifyCred.shopify.shop;
    const accessToken = shopifyCred.shopify.accessToken;

    // Fetch orders data from Shopify.
    const ordersResponse = await axios.get(
      `https://${store}/admin/api/2023-01/orders.json?status=any`,
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
        },
      }
    );
    const orders = ordersResponse.data.orders || [];
    // console.log("orders data", orders.length);

    // Compute dynamic values.
    const totalOrders = orders.length;
    let totalSalesValue = 0;
    let shippingSpendValue = 0;

    orders.forEach((order) => {
      totalSalesValue += parseFloat(order.total_price);
      if (order.shipping_lines && order.shipping_lines.length > 0) {
        shippingSpendValue += parseFloat(order.shipping_lines[0].price);
      }
    });

    // Compute profit margin as a percentage.
    const profitMargin =
      totalSalesValue > 0
        ? ((totalSalesValue - shippingSpendValue) / totalSalesValue * 100).toFixed(2)
        : 0;

    // Compute additional metrics:
    // 1. Order Cancellation: count orders that have a cancellation date.
    const orderCancellationCount = orders.filter(order => order.cancelled_at).length;

    // 2. RTO: if your Shopify data does not include RTO (Return To Origin) info, use a placeholder.
    const rtoCount = 0; // Replace with real logic if available.

    // 3. Gross Profit: totalSales minus shipping spend.
    const grossProfitValue = totalSalesValue - shippingSpendValue;

    // 4. Net Sales: you might adjust this if cancellations or other adjustments apply.
    const netSalesValue = totalSalesValue; // Adjust as needed.

    // Prepare the response data according to what the frontend expects.
    const dynamicData = {
      totalSales: {
        key: "Total Sales",
        value: `₹${totalSalesValue.toFixed(2)}`,
      },
      ordersNo: {
        key: "Orders No.",
        value: totalOrders.toString(),
      },
      marketingSpend: {
        key: "Marketing Spend",
        value: "0", // Static or compute as needed.
      },
      shippingSpend: {
        key: "Shipping Spend",
        value: `₹${shippingSpendValue.toFixed(2)}`,
      },
      profitMargin: {
        key: "Profit Margin",
        value: `${profitMargin}%`,
      },
      orderCancellation: {
        key: "Order Cancellation",
        value: orderCancellationCount.toString(),
      },
      rto: {
        key: "RTO",
        value: rtoCount.toString(),
      },
      grossProfit: {
        key: "Gross Profit",
        value: `₹${grossProfitValue.toFixed(2)}`,
      },
      netSales: {
        key: "Net Sales",
        value: `₹${netSalesValue.toFixed(2)}`,
      },
    };

    return Response.success({
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: dynamicData,
    });
  } catch (error) {
    return handleException(logger, res, error);
  }
};

module.exports = { fetchShopifyOverview };
