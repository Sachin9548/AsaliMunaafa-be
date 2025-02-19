const axios = require("axios");
const Credentials = require("../../../models/credentials");
require("dotenv").config();

const SHIPROCKET_API_BASE_URL = "https://apiv2.shiprocket.in/v1/external";

/**
 * Fetch only new orders (with id > lastProcessedId) from the API.
 * Since orders are returned in descending order (highest id first),
 * we stop paginating once we encounter a page where some orders are old.
 */
const fetchNewOrders = async (token, lastProcessedId) => {
  let newOrders = [];
  let currentPage = 1;
  let hasMore = true;

  while (hasMore) {
    const url = `${SHIPROCKET_API_BASE_URL}/orders?page=${currentPage}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 30000,
    });

    let pageOrders = [];
    if (response.data && Array.isArray(response.data.data)) {
      pageOrders = response.data.data;
    } else if (response.data && Array.isArray(response.data)) {
      pageOrders = response.data;
    } else if (response.data) {
      pageOrders = [response.data];
    }

    // Debug log: Show page and order ids from this page
    console.debug(
      `DEBUG: Page ${currentPage} fetched ${pageOrders.length} orders. Order IDs: ${pageOrders
        .map((order) => order.id)
        .join(", ")}`
    );

    if (pageOrders.length === 0) {
      break;
    }

    // Convert first and last order id in the page to numbers
    const firstId = Number(pageOrders[0].id);
    const lastId = Number(pageOrders[pageOrders.length - 1].id);

    // If the highest id in this page is less than or equal to the lastProcessedId,
    // then none of these orders are new.
    if (firstId <= lastProcessedId) {
      break;
    } else {
      // Filter new orders from this page (those with id > lastProcessedId)
      const filteredOrders = pageOrders.filter(
        (order) => Number(order.id) > lastProcessedId
      );
      newOrders = newOrders.concat(filteredOrders);

      // If this page contains some old orders (i.e. not all orders are new),
      // then we can stop fetching further pages.
      if (filteredOrders.length < pageOrders.length) {
        break;
      }
    }

    currentPage++;
  }

  console.debug(`DEBUG: Total new orders fetched: ${newOrders.length}`);
  return newOrders;
};

const dashboard = async (req, res) => {
  try {
    // Retrieve the Shiprocket credentials
    const credentialRecord = await Credentials.findOne({
      platform: "shiprocket",
      userId: req.userId,
    });

    if (
      !credentialRecord ||
      !credentialRecord.shiprocket ||
      !credentialRecord.shiprocket.authToken ||
      !credentialRecord.shiprocket.authToken.token
    ) {
      console.error("Authorization failed: Invalid credentials");
      return res.status(400).json({ message: "Authorization failed" });
    }
    const token = credentialRecord.shiprocket.authToken.token;

    // Retrieve the last processed id (default to 0 if not set)
    const lastProcessedId = parseInt(
      credentialRecord.shiprocket.lastProcessedId || "0",
      10
    );
    console.debug(`DEBUG: Last processed id from DB: ${lastProcessedId}`);

    // Fetch only new orders from the API (up to the point where orders become old)
    const newOrders = await fetchNewOrders(token, lastProcessedId);
    console.debug(
      `DEBUG: New orders count: ${newOrders.length}. New order IDs: ${newOrders
        .map((order) => order.id)
        .join(", ")}`
    );

    // Initialize counters for new orders
    let newCodOrders = 0;
    let newPrepaidOrders = 0;
    let newDeliveredOrders = 0;
    let newRtoOrders = 0;
    let newTotalSale = 0;
    let newTotalShippingCost = 0;

    // Process each new order to update metrics
    newOrders.forEach((order) => {
      // Determine payment method; assume "cod" means COD, else it's prepaid.
      const paymentMethod = order.payment_method
        ? order.payment_method.trim().toLowerCase()
        : "";
      if (paymentMethod === "cod") {
        newCodOrders++;
      } else {
        newPrepaidOrders++;
      }

      // Count delivered orders
      if (order.status && order.status.trim().toUpperCase() === "DELIVERED") {
        newDeliveredOrders++;
      }

      // Count RTO orders if the status includes "RTO"
      if (order.status && order.status.toUpperCase().includes("RTO")) {
        newRtoOrders++;
      }

      // Sum total sale using product prices (order.products is an array)
      if (order.products && Array.isArray(order.products)) {
        order.products.forEach((product) => {
          newTotalSale += parseFloat(product.price) || 0;
        });
      }

      // Calculate shipping cost: use parseInt so that it becomes an integer.
      if (order.awb_data && order.awb_data.charges) {
        const freightCharges =
          parseInt(order.awb_data.charges.freight_charges, 10) || 0;
        let codCharges = 0;
        if (paymentMethod === "cod") {
          codCharges = parseInt(order.awb_data.charges.cod_charges, 10) || 0;
        }
        newTotalShippingCost += freightCharges + codCharges;
      }
    });

    // Retrieve existing metrics (or initialize if they don't exist)
    const existingMetrics = credentialRecord.shiprocket.metrics || {
      totalOrders: 0,
      codOrders: 0,
      prepaidOrders: 0,
      deliveredOrders: 0,
      rtoOrders: 0,
      totalSale: 0,
      totalShippingCost: 0,
    };

    // Update the metrics by adding values from the new orders
    const updatedMetrics = {
      totalOrders: existingMetrics.totalOrders + newOrders.length,
      codOrders: existingMetrics.codOrders + newCodOrders,
      prepaidOrders: existingMetrics.prepaidOrders + newPrepaidOrders,
      deliveredOrders: existingMetrics.deliveredOrders + newDeliveredOrders,
      rtoOrders: existingMetrics.rtoOrders + newRtoOrders,
      totalSale: existingMetrics.totalSale + newTotalSale,
      totalShippingCost:
        existingMetrics.totalShippingCost + newTotalShippingCost,
    };

    // Update lastProcessedId to the highest id processed (if any new orders)
    let maxProcessedId = lastProcessedId;
    newOrders.forEach((order) => {
      const currentId = parseInt(order.id, 10);
      if (currentId > maxProcessedId) {
        maxProcessedId = currentId;
      }
    });
    console.debug(`DEBUG: Updated lastProcessedId to: ${maxProcessedId}`);

    // Save the updated metrics and lastProcessedId back to the credentials document
    credentialRecord.shiprocket.metrics = updatedMetrics;
    credentialRecord.shiprocket.lastProcessedId = maxProcessedId;
    await credentialRecord.save();
    console.debug("DEBUG: Credentials document updated successfully.");

    // Return the updated metrics in the response
    return res.status(200).json(updatedMetrics);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { dashboard };
