// overalldataController.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const Credentials = require("../../models/credentials");

// Helper function to extract the next page URL from Shopify's Link header.
function extractNextUrl(linkHeader) {
  const links = linkHeader.split(",");
  for (let link of links) {
    const [urlPart, relPart] = link.split(";");
    if (relPart && relPart.includes('rel="next"')) {
      // Remove the surrounding '<' and '>' from the URL part.
      return urlPart.trim().slice(1, -1);
    }
  }
  return null;
}

// Fetch all Shopify orders using pagination.
async function fetchAllOrders(shopifyStore, shopifyAccessToken) {
  let orders = [];
  // Request the maximum number (250) per page.
  let url = `https://${shopifyStore}/admin/api/2023-01/orders.json?status=any&limit=250`;

  while (url) {
    const response = await axios.get(url, {
      headers: { "X-Shopify-Access-Token": shopifyAccessToken },
    });
    orders = orders.concat(response.data.orders);

    // Check if a next page exists from the Link header.
    const linkHeader = response.headers.link;
    if (linkHeader && linkHeader.includes('rel="next"')) {
      url = extractNextUrl(linkHeader);
    } else {
      url = null;
    }
  }
  return orders;
}

const overalldataRouter = async (req, res) => {
  const { logger } = req;

  try {
    // Assume authentication middleware sets req.userId
    const userId = req.userId;

    // ----- Retrieve Shopify Credentials -----
    const shopifyCred = await Credentials.findOne({
      platform: "shopify",
      userId: userId,
    });
    if (!shopifyCred) {
      return res.status(404).json({
        status: "error",
        msg: "Shopify credentials not found",
      });
    }
    const shopifyStore = shopifyCred.shopify.shop;
    const shopifyAccessToken = shopifyCred.shopify.accessToken;

    // ----- Retrieve Meta Credentials (for Marketing Spend) -----
    const metaCred = await Credentials.findOne({
      platform: "meta",
      userId: userId,
    });
    if (!metaCred) {
      return res.status(404).json({
        status: "error",
        msg: "Meta credentials not found",
      });
    }
    const metaAccessToken = metaCred.meta.accessToken;
    const adAccountId = metaCred.meta.adAccountId;

    // ----- Retrieve Shiprocket Credentials (for Shipping Spend) -----
    const shiprocketCred = await Credentials.findOne({
      platform: "shiprocket",
      userId: userId,
    });
    if (
      !shiprocketCred ||
      !shiprocketCred.shiprocket ||
      !shiprocketCred.shiprocket.authToken ||
      !shiprocketCred.shiprocket.authToken.token
    ) {
      return res.status(404).json({
        status: "error",
        msg: "Shiprocket credentials not found",
      });
    }

    // ----- Fire off API calls concurrently -----

    // 1. Shopify Orders (using pagination to fetch all orders)
    const shopifyPromise = fetchAllOrders(shopifyStore, shopifyAccessToken);

    // 2. Meta Marketing Insights (fetch spend for the last 2 years)
    const today = new Date();
    const twoYearsAgo = new Date(today);
    twoYearsAgo.setFullYear(today.getFullYear() - 2);
    const defaultSince = twoYearsAgo.toISOString().split("T")[0];
    const defaultUntil = today.toISOString().split("T")[0];

    const metaPromise = axios.get(
      `https://graph.facebook.com/v15.0/act_${adAccountId}/insights`,
      {
        params: {
          access_token: metaAccessToken,
          fields: "spend",
          time_range: JSON.stringify({ since: defaultSince, until: defaultUntil }),
        },
      }
    );

    // Await both API calls concurrently.
    const [orders, metaResponse] = await Promise.all([shopifyPromise, metaPromise]);

    // ----- Process Shopify Data -----
    const totalOrders = orders.length;
    console.log("Total by shopify  Orders: ", totalOrders);
    let totalSales = 0;
    let orderCancellationCount = 0;
    let newCustomers = 0;
    let returningCustomers = 0;
    let completedCount = 0;
    let pendingCount = 0;

    orders.forEach((order) => {
      totalSales += parseFloat(order.total_price);

      // Count cancellations.
      if (order.cancelled_at) {
        orderCancellationCount++;
      }

      // Count new vs. returning customers.
      if (order.customer) {
        const custOrders = parseInt(order.customer.orders_count, 10) || 0;
        if (custOrders <= 1) {
          newCustomers++;
        } else {
          returningCustomers++;
        }
      }

      // Count order statuses.
      if (order.cancelled_at) {
        // Already counted as cancelled.
      } else if (order.fulfillment_status === "fulfilled") {
        completedCount++;
      } else {
        pendingCount++;
      }
    });

    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    // ----- Process Meta Data -----
    // The insights endpoint returns an array; we take the first record.
    const insightsData =
      metaResponse.data.data && metaResponse.data.data[0]
        ? metaResponse.data.data[0]
        : {};
    const marketingSpend = insightsData.spend ? parseFloat(insightsData.spend) : 0;

    // ----- Process Shiprocket Data (from Database) -----
    const shippingSpend = shiprocketCred.shiprocket.metrics.totalShippingCost || 0;

    // ----- Compute Profit Figures -----
    // Gross Profit = Total Sales minus Shipping Spend.
    const grossProfit = totalSales - shippingSpend;
    // Net Profit = Gross Profit minus Marketing Spend.
    const netProfit = grossProfit - marketingSpend;
    const grossProfitPercentage = totalSales > 0 ? (grossProfit / totalSales) * 100 : 0;
    const netProfitPercentage = totalOrders > 0 ? (netProfit / totalSales) * 100 : 0;
    const profitMargin = totalSales > 0 ? (netProfit / totalSales) * 100 : 0;

    // ----- Prepare Response Data Structure -----
    const dynamicData = {
      totalSales: [
        { key: "Total Sales", value: `₹${totalSales.toFixed(2)}` },
        { key: "Orders No.", value: totalOrders.toString() },
        { key: "Marketing Spend", value: `₹${marketingSpend.toFixed(2)}` },
        { key: "Shipping Spend", value: `₹${shippingSpend.toFixed(2)}` },
        { key: "Profit Margin", value: `${profitMargin.toFixed(2)}%` },
      ],
      totalCollection: [
        { bgColor: "#390083", title: "Total Sales", ruppes: `₹${totalSales.toFixed(2)}` },
        { bgColor: "#00848E", title: "Total Orders", ruppes: totalOrders.toString() },
        { bgColor: "#F49342", title: "Order Cancellation", ruppes: orderCancellationCount.toString() },
        { bgColor: "#4489C8", title: "RTO", ruppes: shiprocketCred.shiprocket.metrics.rtoOrders.toString() },
        { bgColor: "#FDC00F", title: "Gross Profit", ruppes: `₹${grossProfit.toFixed(2)}` },
        { bgColor: "#FD6AC6", title: "Marketing", ruppes: `₹${marketingSpend.toFixed(2)}` },
        { bgColor: "#09347F", title: "Shipping", ruppes: `₹${shippingSpend.toFixed(2)}` },
        { bgColor: "#B391CC", title: "Net Sales", ruppes: `₹${totalSales.toFixed(2)}` },
      ],
      profit: [
        {
          image: "profitImage.svg", // Replace with actual asset path if needed.
          title: "Gross Profit",
          icon: "questionIcon.svg",
          ruppes: `₹${grossProfit.toFixed(2)}`,
          description: "Gross Margin",
          percentage: `${grossProfitPercentage.toFixed(2)}%`,
          height: 310,
        },
        {
          image: "profitImage.svg",
          title: "Net Profit",
          icon: "questionIcon.svg",
          ruppes: `₹${netProfit.toFixed(2)}`,
          description: "Net Margin",
          percentage: `${netProfitPercentage.toFixed(2)}%`,
          height: 310,
        },
      ],
      grossProfitnetProfit: {
        labels: ["Gross Profit", "Net Profit"],
        datasets: [
          {
            data: [grossProfit, netProfit],
            backgroundColor: ["#6495ED", "#DC143C"],
          },
        ],
      },
      expenseBreakdownChartData: {
        labels: ["Marketing", "Shipping"],
        datasets: [
          {
            data: [marketingSpend, shippingSpend],
            backgroundColor: ["#4169E1", "#3CB371"],
          },
        ],
      },
      newVsReturningChartData: {
        labels: ["New Customers", "Returning Customers"],
        datasets: [
          {
            data: [newCustomers, returningCustomers],
            backgroundColor: ["#FF7F50", "#FF1493"],
          },
        ],
      },
      ordersChartData: {
        labels: ["Completed", "Pending", "Cancelled"],
        datasets: [
          {
            data: [completedCount, pendingCount, orderCancellationCount],
            backgroundColor: ["#32CD32", "#FFD700", "#FF4500"],
          },
        ],
      },
      avgOrderValue: `₹${avgOrderValue.toFixed(2)}`,
      totalProfit: `₹${grossProfit.toFixed(2)}`,
      marketingSpend: `₹${marketingSpend.toFixed(2)}`,
      shippingSpend: `₹${shippingSpend.toFixed(2)}`,
      netSales: `₹${totalSales.toFixed(2)}`,
    };

    return res.status(200).json({
      status: "success",
      data: dynamicData,
    });
  } catch (error) {
    console.error("Error fetching dynamic overview data:", error);
    return res.status(500).json({
      status: "error",
      msg: "An error occurred while fetching data",
    });
  }
};

module.exports = overalldataRouter;
