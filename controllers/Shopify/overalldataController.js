// overalldataController.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const Credentials = require("../../models/credentials");
const BusinessDetails = require("../../models/businessDetails");

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

    // ----- Retrieve Business Details (for Manufacturing Cost) -----
    const businessDetails = await BusinessDetails.findOne({ userId: userId });
    if (!businessDetails) {
      return res.status(404).json({
        status: "error",
        msg: "Business details not found",
      });
    }
    // Build a map for quick lookup of manufacturing costs by productId.
    const productCostMap = {};
    businessDetails.products.forEach((product) => {
      productCostMap[product.productId] = product.manufacturingCost;
    });

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
    let totalSales = 0;
    let orderCancellationCount = 0;
    let completedCount = 0;
    let pendingCount = 0;

    // Calculate total sales, cancellations, and order statuses.
    orders.forEach((order) => {
      totalSales += parseFloat(order.total_price);

      if (order.cancelled_at) {
        orderCancellationCount++;
      }

      if (order.cancelled_at) {
        // already counted as cancelled.
      } else if (order.fulfillment_status === "fulfilled") {
        completedCount++;
      } else {
        pendingCount++;
      }
    });

    // CUSTOMER ANALYTICS: Build a customersMap to track first order date and order count per customer.
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
    if (req.query.start_date && req.query.end_date) {
      const startDate = new Date(req.query.start_date);
      const endDate = new Date(req.query.end_date);
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
      // Count customers with only one order as new.
      newCustomers = Object.values(customersMap).filter(
        (cust) => cust.ordersCount === 1
      ).length;
    }
    const returningCustomers = totalCustomers - newCustomers;

    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    // ----- Process Meta Data -----
    const insightsData =
      metaResponse.data.data && metaResponse.data.data[0]
        ? metaResponse.data.data[0]
        : {};
    const marketingSpend = insightsData.spend ? parseFloat(insightsData.spend) : 0;

    // ----- Process Shiprocket Data (from Database) -----
    const shippingSpend = shiprocketCred.shiprocket.metrics.totalShippingCost || 0;

    // ----- Calculate Total Manufacturing Cost -----
    // Assuming each order has a `line_items` array with items having a `product_id` and `quantity`
    let totalManufacturingCost = 0;
    orders.forEach((order) => {
      if (order.line_items && Array.isArray(order.line_items)) {
        order.line_items.forEach((item) => {
          const prodId = item.product_id ? item.product_id.toString() : null;
          const costPerUnit = prodId && productCostMap[prodId] ? productCostMap[prodId] : 0;
          totalManufacturingCost += costPerUnit * (item.quantity || 0);
        });
      }
    });
    // console.log("Total Manufacturing Cost:", totalManufacturingCost);

    // ----- Compute Profit Figures ----- 
    // Here, gross profit is defined as total sales minus total manufacturing cost.
    const grossProfit = totalSales - totalManufacturingCost;
    const netProfit = grossProfit - marketingSpend - shippingSpend;
    const grossProfitPercentage = totalSales > 0 ? (grossProfit / totalSales) * 100 : 0;
    const netProfitPercentage = totalSales > 0 ? (netProfit / totalSales) * 100 : 0;
    const profitMargin = totalSales > 0 ? (netProfit / totalSales) * 100 : 0;

   // ===== BEGIN RFM METRICS SECTION =====

// Build RFM data per customer from orders
const rfmData = {};
orders.forEach((order) => {
  if (order.customer && order.customer.id) {
    const custId = order.customer.id;
    // If this is the first order for the customer, initialize the object
    if (!rfmData[custId]) {
      rfmData[custId] = {
        firstOrderDate: order.created_at,          // Date of first order
        lastOrderDate: order.created_at,           // Date of most recent order (will update if later order exists)
        ordersCount: 1,                            // Frequency count starts at 1
        totalSpend: parseFloat(order.total_price), // Total spend (as a number)
      };
    } else {
      // Update last order date if current order is later than the stored one
      if (new Date(order.created_at) > new Date(rfmData[custId].lastOrderDate)) {
        rfmData[custId].lastOrderDate = order.created_at;
      }
      // Increase the orders count (Frequency)
      rfmData[custId].ordersCount++;
      // Sum up the spend (Monetary)
      rfmData[custId].totalSpend += parseFloat(order.total_price);
    }
  }
});

// Prepare arrays to calculate quantile thresholds for each RFM metric
const recencyArr = [];
const frequencyArr = [];
const monetaryArr = [];
Object.values(rfmData).forEach((customer) => {
  // Calculate recency in days from the customer's last order
  const recencyDays = Math.floor((today - new Date(customer.lastOrderDate)) / (1000 * 60 * 60 * 24));
  customer.recency = recencyDays;
  recencyArr.push(recencyDays);
  frequencyArr.push(customer.ordersCount);
  monetaryArr.push(customer.totalSpend);
});

// Helper function to compute quantile value of an array
function getQuantile(arr, q) {
  const sorted = [...arr].sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
    return sorted[base];
  }
}

// Compute 33rd and 66th percentiles for recency, frequency, and monetary metrics
const recencyLow = getQuantile(recencyArr, 0.33);
const recencyHigh = getQuantile(recencyArr, 0.66);
const frequencyLow = getQuantile(frequencyArr, 0.33);
const frequencyHigh = getQuantile(frequencyArr, 0.66);
const monetaryLow = getQuantile(monetaryArr, 0.33);
const monetaryHigh = getQuantile(monetaryArr, 0.66);

// Assign R, F, M scores and determine customer segment for each customer
Object.values(rfmData).forEach((customer) => {
  // R-Score: Lower recency (fewer days since last order) is better.
  if (customer.recency <= recencyLow) {
    customer.rScore = 3;
  } else if (customer.recency > recencyHigh) {
    customer.rScore = 1;
  } else {
    customer.rScore = 2;
  }
  // F-Score: Higher orders count (frequency) is better.
  if (customer.ordersCount <= frequencyLow) {
    customer.fScore = 1;
  } else if (customer.ordersCount > frequencyHigh) {
    customer.fScore = 3;
  } else {
    customer.fScore = 2;
  }
  // M-Score: Higher total spend is better.
  if (customer.totalSpend <= monetaryLow) {
    customer.mScore = 1;
  } else if (customer.totalSpend > monetaryHigh) {
    customer.mScore = 3;
  } else {
    customer.mScore = 2;
  }
  // Total score is the sum of the individual R, F, and M scores.
  customer.totalScore = customer.rScore + customer.fScore + customer.mScore;

  // Determine segment based on scores and recency thresholds.
  // If the customer's first order was within the last 30 days, mark as "New Customers".
  const firstOrderDays = Math.floor((today - new Date(customer.firstOrderDate)) / (1000 * 60 * 60 * 24));
  if (firstOrderDays <= 30) {
    customer.segment = "New Customers";
  } else if (customer.recency > 180) {
    customer.segment = "Lost";
  } else if (customer.recency > 120 && customer.fScore === 3) {
    customer.segment = "Sleepers";
  } else {
    // Assign segment based on the total RFM score.
    switch (customer.totalScore) {
      case 9:
        customer.segment = "Champion";
        break;
      case 8:
        customer.segment = "Loyal";
        break;
      case 7:
        customer.segment = "Warm Leads";
        break;
      case 6:
        customer.segment = "Promising";
        break;
      case 5:
        customer.segment = "Need Attention";
        break;
      case 4:
        customer.segment = "Should Not Lose";
        break;
      default:
        customer.segment = "Lost";
    }
  }
});

// Count customers per segment
const segmentCounts = {
  "Champion": 0,
  "Loyal": 0,
  "Promising": 0,
  "Need Attention": 0,
  "Should Not Lose": 0,
  "Sleepers": 0,
  "Lost": 0,
  "New Customers": 0,
  "Warm Leads": 0
};

const rfmCustomers = Object.values(rfmData);
const totalRfmCustomers = rfmCustomers.length;

rfmCustomers.forEach((customer) => {
  if (segmentCounts[customer.segment] !== undefined) {
    segmentCounts[customer.segment]++;
  } else {
    segmentCounts[customer.segment] = 1;
  }
});

// Build an array with segment percentages in the order expected by the frontend.
const rfmMetricsData = [
  { segment: "Champion", percentage: ((segmentCounts["Champion"] / totalRfmCustomers) * 100).toFixed(1) },
  { segment: "Loyal", percentage: ((segmentCounts["Loyal"] / totalRfmCustomers) * 100).toFixed(1) },
  { segment: "Promising", percentage: ((segmentCounts["Promising"] / totalRfmCustomers) * 100).toFixed(1) },
  { segment: "Need Attention", percentage: ((segmentCounts["Need Attention"] / totalRfmCustomers) * 100).toFixed(1) },
  { segment: "Should Not Lose", percentage: ((segmentCounts["Should Not Lose"] / totalRfmCustomers) * 100).toFixed(1) },
  { segment: "Sleepers", percentage: ((segmentCounts["Sleepers"] / totalRfmCustomers) * 100).toFixed(1) },
  { segment: "Lost", percentage: ((segmentCounts["Lost"] / totalRfmCustomers) * 100).toFixed(1) },
  { segment: "New Customers", percentage: ((segmentCounts["New Customers"] / totalRfmCustomers) * 100).toFixed(1) },
  { segment: "Warm Leads", percentage: ((segmentCounts["Warm Leads"] / totalRfmCustomers) * 100).toFixed(1) }
];
// ===== END RFM METRICS SECTION =====

console.log("rfmMetricsData", rfmMetricsData);
    // ----- Prepare Response Data Structure -----
    const dynamicData = {
      totalSales: [
        { key: "Total Revenue", value: `₹${totalSales.toFixed(2)}`, tooltip: "Total Revenue: Total income from sales." },
        { key: "Orders No.", value: totalOrders.toString(), tooltip: "Orders Number: Total number of orders received." },
        { key: "Marketing Spend", value: `₹${marketingSpend.toFixed(2)}`, tooltip: "Marketing Spend: Total expenditure on marketing." },
        { key: "Shipping Spend", value: `₹${shippingSpend.toFixed(2)}`, tooltip: "Shipping Spend: Total expenditure on shipping." },
        { key: "Profit Margin", value: `${profitMargin.toFixed(2)}%`, tooltip: "Profit Margin: (Profit / Revenue) * 100." },
      ],
      totalCollection: [
        { bgColor: "#390083", title: "Total Sales", ruppes: `₹${totalSales.toFixed(2)}`, tooltip: "Total Sales: Total income from sales." },
        { bgColor: "#00848E", title: "Total Orders", ruppes: totalOrders.toString(), tooltip: "Total Orders: Total number of orders received." },
        { bgColor: "#F49342", title: "Order Cancellation", ruppes: orderCancellationCount.toString(), tooltip: "Order Cancellation: Total number of orders cancelled." },
        { bgColor: "#4489C8", title: "RTO", ruppes: shiprocketCred.shiprocket.metrics.rtoOrders.toString(), tooltip: "RTO: Total number of orders returned to origin." },
        { bgColor: "#FDC00F", title: "Gross Profit", ruppes: `₹${grossProfit.toFixed(2)}`, tooltip: "Gross Profit: Total revenue minus total manufacturing cost." },
        { bgColor: "#FD6AC6", title: "Marketing", ruppes: `₹${marketingSpend.toFixed(2)}`, tooltip: "Marketing: Total expenditure on marketing." },
        { bgColor: "#09347F", title: "Shipping", ruppes: `₹${shippingSpend.toFixed(2)}`, tooltip: "Shipping: Total expenditure on shipping." },
        { bgColor: "#B391CC", title: "Net Sales", ruppes: `₹${totalSales.toFixed(2)}`, tooltip: "Net Sales: Total revenue - marketing and shipping costs." },
      ],
      profit: [
        {
          image: "profitImage.svg",
          title: "Gross Profit",
          icon: "questionIcon.svg",
          ruppes: `₹${grossProfit.toFixed(2)}`,
          description: "Gross Margin",
          percentage: `${grossProfitPercentage.toFixed(2)}%`,
          height: 250,
          tooltip: "Gross Profit: Total revenue - total manufacturing cost.",
        },
        {
          image: "profitImage.svg",
          title: "Net Profit",
          icon: "questionIcon.svg",
          ruppes: `₹${netProfit.toFixed(2)}`,
          description: "Net Margin",
          percentage: `${netProfitPercentage.toFixed(2)}%`,
          height: 250,
          tooltip: "Net Profit: Gross profit - marketing and shipping costs.",
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
      totalCustomers, // Total unique customers.
      // Add the computed RFM metrics to be consumed by the frontend
      rfmMetrics: {
        tooltip: "RFM Metrics: Recency, Frequency, Monetary segments.",
        data: rfmMetricsData,
      },
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
