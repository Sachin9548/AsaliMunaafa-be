const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../helpers/constant");
const { handleException } = require("../../helpers/exception");
const Response = require("../../helpers/response");
const { shopifyCrede } = require("../../helpers/shopify");
const { ObjectId } = require("mongoose").Types;

const fetchAnalytics = async (req, res) => {
  const { logger } = req;
  try {
    const shopify = await shopifyCrede(req, res);
    const orders = await shopify.order.list();

    // Initialize totals
    let totalSales = 0;
    let totalShippingSpend = 0;
    let totalDiscounts = 0;
    let totalTax = 0;
    let totalSubtotal = 0;
    let totalCOGS = 0;
    let orderCount = 0;
    let rtoCount = 0;

    // Function to fetch marketing spend
    async function fetchMarketingSpend() {
      try {
        const marketingEvents = await shopify.marketingEvent.list();
        let totalMarketingSpend = 0;

        for (const event of marketingEvents) {
          totalMarketingSpend += parseFloat(event.budget) || 0;
        }

        return totalMarketingSpend;
      } catch (error) {
        console.error("Error fetching marketing spend:", error);
        return 0;
      }
    }

    // Function to fetch COGS for a specific product
    async function fetchCOGS(productId) {
      try {
        const metafields = await shopify.metafield.list({
          metafield: {
            owner_id: productId,
            owner_resource: "product",
          },
        });

        // Assuming 'cogs' is the key in metafields where COGS is stored
        const cogsField = metafields.find((field) => field.key === "cogs");
        return cogsField ? parseFloat(cogsField.value) : 0;
      } catch (error) {
        console.error("Error fetching COGS:", error);
        return 0;
      }
    }

    // Fetch the total marketing spend
    const marketingSpend = await fetchMarketingSpend();

    for (const order of orders) {
      // Parse values
      const orderTotalPrice = parseFloat(order.total_price);
      const shippingSpend = parseFloat(
        order.total_shipping_price_set.shop_money.amount
      );
      const orderDiscounts = parseFloat(
        order.current_total_discounts_set.shop_money.amount
      );
      const orderTax = order.line_items.reduce((sum, item) => {
        return (
          sum +
          item.tax_lines.reduce(
            (itemSum, taxLine) => itemSum + parseFloat(taxLine.price),
            0
          )
        );
      }, 0);
      const orderSubtotal = parseFloat(
        order.line_items.reduce((sum, item) => sum + parseFloat(item.price), 0)
      );

      // Fetch COGS for each product in the order
      let orderCOGS = 0;
      for (const lineItem of order.line_items) {
        const productId = lineItem.product_id;
        const productCOGS = await fetchCOGS(productId);
        orderCOGS += productCOGS * lineItem.quantity;
      }

      // Accumulate totals
      totalSales += orderTotalPrice;
      totalShippingSpend += shippingSpend;
      totalDiscounts += orderDiscounts;
      totalTax += orderTax;
      totalSubtotal += orderSubtotal;
      totalCOGS += orderCOGS;
      orderCount++;

      // Check for RTO condition (assuming RTO is identified by 'cancelled_at' field or similar)
      if (order.cancelled_at) {
        rtoCount++;
      }
    }

    const grossProfit = totalSubtotal - totalCOGS;
    const netProfit = grossProfit - marketingSpend - totalShippingSpend;
    const netSales = totalSales - totalDiscounts;

    // Calculate profit margin
    const profitMargin = netSales > 0 ? (netProfit / netSales) * 100 : 0;

    const orderCancellationCount = orders.reduce(
      (count, order) => (order.cancelled_at ? count + 1 : count),
      0
    );

    const obj = {
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: {
        totalSales,
        marketingSpend,
        totalShippingSpend,
        orderCount,
        grossProfit,
        netProfit,
        netSales,
        profitMargin,
        orderCancellationCount,
        rtoCount,
      },
    };
    return Response.success(obj);
  } catch (error) {
    console.error("Error fetching Shopify analytics:", error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  fetchAnalytics,
};
