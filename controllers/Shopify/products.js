const axios = require("axios");
const { ObjectId } = require("mongoose").Types;
const Credentials = require("../../models/credentials");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../helpers/constant");
const { handleException } = require("../../helpers/exception");
const Response = require("../../helpers/response");

const fetchProducts = async (req, res) => {
  const { logger } = req;
  try {
    const { userId } = req;

    // Get optional date filter from query parameters
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

    // Fetch products and orders concurrently.
    const [productsResult, ordersResult] = await Promise.allSettled([
      shopifyClient.get("/products.json"),
      shopifyClient.get("/orders.json"),
    ]);

    if (
      productsResult.status !== "fulfilled" ||
      ordersResult.status !== "fulfilled"
    ) {
      const errors = [];
      if (productsResult.status !== "fulfilled") {
        errors.push(`Products fetch error: ${productsResult.reason}`);
      }
      if (ordersResult.status !== "fulfilled") {
        errors.push(`Orders fetch error: ${ordersResult.reason}`);
      }
      console.error("Error fetching data from Shopify:", errors.join("; "));
      return Response.error({
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: "Failed to fetch products or orders from Shopify",
      });
    }

    const products = productsResult.value.data.products;
    const fullOrders = ordersResult.value.data.orders; // all orders fetched

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
    const totalSales = orders.reduce(
      (sum, order) => sum + parseFloat(order.total_price),
      0
    );
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    // Chart data: orders over time (by date)
    const ordersByDate = {};
    orders.forEach((order) => {
      const date = order.created_at.split("T")[0];
      ordersByDate[date] = (ordersByDate[date] || 0) + 1;
    });
    const sortedDates = Object.keys(ordersByDate).sort();
    const chartData = {
      labels: sortedDates,
      datasets: [
        {
          data: sortedDates.map((date) => ordersByDate[date]),
          label: "Orders Over Time",
          borderColor: "#2453FF",
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    // Simulated sessions by devices.
    const sessionsByDevices = {
      Desktop: 70,
      Mobile: 30,
    };

    // Process products to compute per–product analytics.
    const combinedData = [];
    for (const product of products) {
      let totalSalesCount = 0;
      let totalRevenue = 0;
      let totalCost = 0;

      // Process each variant (fetch inventory cost if available)
      for (const variant of product.variants) {
        let inventoryItemCost = 0;
        if (variant.inventory_item_id) {
          try {
            const invResponse = await shopifyClient.get(
              `/inventory_items/${variant.inventory_item_id}.json`
            );
            const inventoryItem = invResponse.data.inventory_item;
            inventoryItemCost =
              inventoryItem && inventoryItem.cost
                ? parseFloat(inventoryItem.cost)
                : 0;
          } catch (invError) {
            console.error(
              `Error fetching inventory for variant ${variant.id}: ${invError.message}`
            );
          }
        } else {
          console.warn(
            `Variant ${variant.id} does not have a valid inventory_item_id`
          );
        }

        // Find orders that include this product.
        const productSales = orders.filter((order) =>
          order.line_items.some((item) => item.product_id === product.id)
        );

        // Total quantity sold for this product.
        const variantSalesCount = productSales.reduce((sum, order) => {
          return (
            sum +
            order.line_items.reduce((itemSum, item) => {
              return item.product_id === product.id
                ? itemSum + item.quantity
                : itemSum;
            }, 0)
          );
        }, 0);
        totalSalesCount += variantSalesCount;

        // Total revenue for this product.
        totalRevenue += productSales.reduce((sum, order) => {
          return (
            sum +
            order.line_items.reduce((itemSum, item) => {
              return item.product_id === product.id
                ? itemSum + parseFloat(item.price) * item.quantity
                : itemSum;
            }, 0)
          );
        }, 0);

        // Total cost (using inventory cost).
        totalCost += inventoryItemCost * variantSalesCount;
      }
      const profits = totalRevenue - totalCost;
      const profitMargin = totalRevenue ? (profits / totalRevenue) * 100 : 0;
      combinedData.push({
        productName: product.title,
        sales: totalSalesCount,
        totalSales: totalRevenue,
        profits,
        profitMargin,
        grossProfit: profits,
        ...product,
      });
    }

    // Determine best sellers, most profitable, and least profitable.
    const bestSellers = [...combinedData]
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
    const mostProfitable = [...combinedData]
      .sort((a, b) => b.profits - a.profits)
      .slice(0, 5);
    const leastProfitable = [...combinedData]
      .sort((a, b) => a.profits - b.profits)
      .slice(0, 5);

    // ---- CUSTOMER ANALYTICS ----
    // Build a map of customers (using orders that have a customer object)
    const customersMap = {};
    orders.forEach((order) => {
      if (order.customer && order.customer.id) {
        const custId = order.customer.id;
        if (!customersMap[custId]) {
          customersMap[custId] = {
            firstOrderDate: order.created_at,
            ordersCount: 1,
            totalSpent: parseFloat(order.total_price),
          };
        } else {
          customersMap[custId].ordersCount++;
          customersMap[custId].totalSpent += parseFloat(order.total_price);
          if (new Date(order.created_at) < new Date(customersMap[custId].firstOrderDate)) {
            customersMap[custId].firstOrderDate = order.created_at;
          }
        }
      }
    });
    const totalCustomers = Object.keys(customersMap).length;

    // New vs. Returning customers:
    let newCustomersCount = 0;
    if (startDate && endDate) {
      newCustomersCount = new Set(
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
      newCustomersCount = Object.values(customersMap).filter(
        (cust) => cust.ordersCount === 1
      ).length;
    }
    const returningCustomersCount = totalCustomers - newCustomersCount;

    // Repurchase rate: % of customers with more than one order.
    const customersWithRepurchase = Object.values(customersMap).filter(
      (cust) => cust.ordersCount > 1
    ).length;
    const repurchaseRate =
      totalCustomers > 0 ? (customersWithRepurchase / totalCustomers) * 100 : 0;

    // New Customer Growth Rate: if date filter provided, compare with previous period.
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
      const previousNewCustomersCount = new Set(
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
      if (previousNewCustomersCount > 0) {
        newCustomerGrowthRate =
          ((newCustomersCount - previousNewCustomersCount) / previousNewCustomersCount) * 100;
      } else {
        newCustomerGrowthRate = newCustomersCount > 0 ? 100 : 0;
      }
    }

    // Cohort Analysis: group customers by the month of their first order.
    const cohortMap = {};
    for (const custId in customersMap) {
      const firstOrderDate = new Date(customersMap[custId].firstOrderDate);
      const cohortKey = `${firstOrderDate.getFullYear()}-${("0" + (firstOrderDate.getMonth() + 1)).slice(-2)}`;
      if (!cohortMap[cohortKey]) {
        cohortMap[cohortKey] = { totalRevenue: 0, count: 0 };
      }
      cohortMap[cohortKey].totalRevenue += customersMap[custId].totalSpent;
      cohortMap[cohortKey].count++;
    }
    const cohortAnalysis = Object.entries(cohortMap).map(
      ([cohort, data]) => ({
        cohort,
        totalRevenuePerCustomer: data.count > 0 ? data.totalRevenue / data.count : 0,
        totalRevenue: data.totalRevenue,
        customerCount: data.count,
      })
    );

    // Prepare chart data for new vs. returning customers.
    const newVsReturningChartData = {
      labels: ["New Customers", "Returning Customers"],
      datasets: [
        {
          data: [newCustomersCount, returningCustomersCount],
          backgroundColor: ["#4C45E3", "#2453FF"],
        },
      ],
    };

    // ---- ADDITIONAL CHART DATA ----
    // Overall Shipment Status (simulate based on orders count)
    const totalShipment = totalOrders;
    const inTransit = Math.floor(totalShipment * 0.3);
    const delivered = Math.floor(totalShipment * 0.5);
    const rto = Math.floor(totalShipment * 0.1);
    const ndr = totalShipment - (inTransit + delivered + rto);
    const overallStatusChartData = {
      labels: ["Total Shipment", "In Transit", "Delivered", "RTO", "NDR"],
      datasets: [
        {
          data: [totalShipment, inTransit, delivered, rto, ndr],
          backgroundColor: ["#117899", "#0F5B78", "#1FC105", "#F16C20", "#ECAA38"],
        },
      ],
    };

    // Revenue Chart Data: Top 3 products by revenue
    const sortedByRevenue = [...combinedData]
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, 3);
    const revenueLabels = sortedByRevenue.map((item) => item.productName);
    const revenueValues = sortedByRevenue.map((item) => item.totalSales);
    const revenueChartData = {
      labels: revenueLabels,
      datasets: [
        {
          data: revenueValues,
          backgroundColor: ["#4C45E3", "#2453FF", "#1FC105"],
        },
      ],
    };

    return Response.success({
      req,
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: {
        Response: combinedData,
        totalSales,
        averageOrderValue,
        totalOrders,
        totalCustomers,
        newCustomers: newCustomersCount,
        returningCustomers: returningCustomersCount,
        newCustomerGrowthRate,
        repurchaseRate,
        cohortAnalysis,
        bestSellers,
        mostProfitable,
        leastProfitable,
        chartData,
        sessionsByDevices,
        newVsReturningChartData,
        overallStatusChartData,
        revenueChartData,
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
