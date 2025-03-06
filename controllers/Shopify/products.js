const axios = require("axios");
const { ObjectId } = require("mongoose").Types;
const Credentials = require("../../models/credentials");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../helpers/constant");
const { handleException } = require("../../helpers/exception");
const Response = require("../../helpers/response");

/**
 * Fetch all orders from Shopify using pagination.
 * Uses the "page_info" cursor parameter from Shopify's Link header.
 */
const fetchAllOrders = async (shopifyClient) => {
  let orders = [];
  // Updated URL to include status=any so that all orders are fetched.
  let url = "/orders.json?limit=250&status=any";
  
  while (url) {
    const response = await shopifyClient.get(url);
    const currentOrders = response.data.orders;
    orders = orders.concat(currentOrders);
    
    // Check for a next page in the Link header
    const linkHeader = response.headers.link;
    if (linkHeader) {
      // Example Link header format:
      // <https://shop.myshopify.com/admin/api/2023-04/orders.json?limit=250&page_info=xxx>; rel="next"
      const links = linkHeader.split(",");
      const nextLink = links.find((link) => link.includes('rel="next"'));
      if (nextLink) {
        // Extract URL inside the < >
        const match = nextLink.match(/<([^>]+)>/);
        if (match && match[1]) {
          // Remove baseURL part from the URL (shopifyClient already has baseURL)
          const fullNextUrl = match[1];
          const baseURL = shopifyClient.defaults.baseURL;
          url = fullNextUrl.replace(baseURL, "");
        } else {
          url = null;
        }
      } else {
        url = null; 
      }
    } else {
      url = null;
    }
  }
  return orders;
};

const fetchProducts = async (req, res) => {
  const { logger } = req;
  try {
    const { userId } = req;

    // Get optional date filter from query parameters.
    const { start_date, end_date } = req.query;
    const startDate = start_date ? new Date(start_date) : null;
    const endDate = end_date ? new Date(end_date) : null;

    const getCrede = await Credentials.findOne({
      userId: new ObjectId(userId),
      platform: "shopify",
    });
    if (!getCrede) {
      return Response.error({
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.DATA_NOT_FOUND,
      });
    }
    const { accessToken, shop } = getCrede.shopify;
    if (!accessToken || !shop) {
      return Response.error({
        res,
        status: STATUS_CODE.UN_AUTHORIZED,
        msg: ERROR_MSGS.AUTHORIZATION_FAILED,
      });
    }

    const apiVersion = "2023-04";
    const baseURL = `https://${shop}/admin/api/${apiVersion}`;
    const shopifyClient = axios.create({
      baseURL,
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    // Fetch all orders with pagination.
    const fullOrders = await fetchAllOrders(shopifyClient);

    // Filter orders by date (if provided)
    let orders = fullOrders;
    if (startDate || endDate) {
      orders = fullOrders.filter((order) => {
        const orderDate = new Date(order.created_at);
        if (startDate && orderDate < startDate) return false;
        if (endDate && orderDate > endDate) return false;
        return true;
      });
    }

    // Compute store-level metrics from orders.
    const totalOrders = orders.length;
    const totalSales = Math.round(
      orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0)
    );
    const averageOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

    // CUSTOMER ANALYTICS
    const customersMap = {};
    orders.forEach((order) => {
      if (order.customer && order.customer.id) {
        const custId = order.customer.id;
        if (!customersMap[custId]) {
          customersMap[custId] = {
            firstOrderDate: order.created_at,
            ordersCount: 1,
          };
        } else {
          customersMap[custId].ordersCount++;
          if (new Date(order.created_at) < new Date(customersMap[custId].firstOrderDate)) {
            customersMap[custId].firstOrderDate = order.created_at;
          }
        }
      }
    });
    const totalCustomers = Object.keys(customersMap).length;
    let newCustomers = 0;
    if (startDate && endDate) {
      newCustomers = new Set(
        orders
          .filter(
            (order) =>
              order.customer &&
              order.customer.id &&
              new Date(customersMap[order.customer.id].firstOrderDate) >= startDate &&
              new Date(customersMap[order.customer.id].firstOrderDate) <= endDate
          )
          .map((order) => order.customer.id)
      ).size;
    } else {
      newCustomers = Object.values(customersMap).filter(
        (cust) => cust.ordersCount === 1
      ).length;
    }
    const returningCustomers = totalCustomers - newCustomers;
    const repurchaseRate =
      totalCustomers > 0
        ? Math.round(
            (Object.values(customersMap).filter((cust) => cust.ordersCount > 1).length / totalCustomers) * 100
          )
        : 0;

    // New vs. Returning Customers Chart Data.
    const newVsReturningChartData = {
      labels: ["New Customers", "Returning Customers"],
      datasets: [
        {
          data: [newCustomers, returningCustomers],
          backgroundColor: ["#4C45E3", "#2453FF"],
        },
      ],
    };

    // New Customer Growth Rate: Compare with previous period if date filter provided.
    let newCustomerGrowthRate = 0;
    if (startDate && endDate) {
      const duration = endDate.getTime() - startDate.getTime();
      const previousStart = new Date(startDate.getTime() - duration);
      const previousEnd = new Date(startDate.getTime() - 86400000);
      const previousOrders = fullOrders.filter((order) => {
        const orderDate = new Date(order.created_at);
        return orderDate >= previousStart && orderDate <= previousEnd;
      });
      const previousCustomersMap = {};
      previousOrders.forEach((order) => {
        if (order.customer && order.customer.id) {
          const custId = order.customer.id;
          if (!previousCustomersMap[custId]) {
            previousCustomersMap[custId] = {
              firstOrderDate: order.created_at,
              ordersCount: 1,
            };
          } else {
            previousCustomersMap[custId].ordersCount++;
            if (new Date(order.created_at) < new Date(previousCustomersMap[custId].firstOrderDate)) {
              previousCustomersMap[custId].firstOrderDate = order.created_at;
            }
          }
        }
      });
      const previousNewCustomers = new Set(
        previousOrders
          .filter(
            (order) =>
              order.customer &&
              order.customer.id &&
              new Date(previousCustomersMap[order.customer.id].firstOrderDate) >= previousStart &&
              new Date(previousCustomersMap[order.customer.id].firstOrderDate) <= previousEnd
          )
          .map((order) => order.customer.id)
      ).size;
      if (previousNewCustomers > 0) {
        newCustomerGrowthRate = Math.round(((newCustomers - previousNewCustomers) / previousNewCustomers) * 100);
      } else {
        newCustomerGrowthRate = newCustomers > 0 ? 100 : 0;
      }
    }

    // Overall Shipment Status: using actual order statuses.
    const deliveredOrders = orders.filter(
      (order) => order.fulfillment_status === "fulfilled"
    ).length;
    const cancelledOrders = orders.filter(
      (order) => order.cancelled_at
    ).length;
    const pendingOrders = totalOrders - deliveredOrders - cancelledOrders;
    const overallStatusChartData = {
      labels: ["Delivered", "Cancelled", "Pending"],
      datasets: [
        {
          data: [deliveredOrders, cancelledOrders, pendingOrders],
          backgroundColor: ["#1FC105", "#F16C20", "#ECAA38"],
        },
      ],
    };

    // Best Selling Products and Least Selling Products:
    // Aggregate sales by product_id from order line_items.
    const productSalesMap = {};
    orders.forEach((order) => {
      order.line_items.forEach((item) => {
        const productId = item.product_id;
        if (!productSalesMap[productId]) {
          productSalesMap[productId] = {
            productName: item.title,
            sales: 0,
            totalSales: 0,
          };
        }
        productSalesMap[productId].sales += item.quantity;
        productSalesMap[productId].totalSales += parseFloat(item.price) * item.quantity;
        // Round total sales for each product
        productSalesMap[productId].totalSales = Math.round(productSalesMap[productId].totalSales);
      });
    });

    // Calculate best selling products (top 5 by quantity sold)
    const bestSellers = Object.values(productSalesMap)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    // Calculate 5 least selling products (lowest quantity sold)
    const leastSellers = Object.values(productSalesMap)
      .sort((a, b) => a.sales - b.sales)
      .slice(0, 5);

    return Response.success({
      req,
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: {
        totalSales,
        averageOrderValue,
        totalOrders,
        totalCustomers,
        newCustomers,
        returningCustomers,
        newCustomerGrowthRate,
        repurchaseRate,
        newVsReturningChartData,
        overallStatusChartData,
        bestSellers,
        leastSellers, // Added least selling products data
      },
    });
  } catch (error) {
    console.error(
      "Error in fetchProducts:",
      error.response ? error.response.data : error.message
    );
    return handleException(logger, res, error);
  }
};

module.exports = { fetchProducts };

