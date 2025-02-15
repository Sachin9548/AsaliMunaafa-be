// controllers/metaController.js
const axios = require("axios");
const Credentials = require("../../../models/credentials");
const Response = require("../../../helpers/response");
const { STATUS_CODE, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");

const getMetaData = async (req, res) => {
  const { userId, logger } = req;
  try {
    // Retrieve the stored Meta credentials for this user.
    const metaCred = await Credentials.findOne({ platform: "meta", userId });
    if (!metaCred) {
      return Response.error({
        res,
        status: STATUS_CODE.NOT_FOUND,
        msg: "Meta credentials not found",
      });
    }
    const accessToken = metaCred.meta.accessToken;
    const adAccountId = metaCred.meta.adAccountId;

    // Get the date range from the query parameters.
    const { start, end } = req.query;
    let timeRange;
    if (start && end) {
      timeRange = JSON.stringify({ since: start, until: end });
    } else {
      const today = new Date();
      const twoYearsAgo = new Date(today);
      twoYearsAgo.setFullYear(today.getFullYear() - 2);
      const defaultSince = twoYearsAgo.toISOString().split("T")[0];
      const defaultUntil = today.toISOString().split("T")[0];
      timeRange = JSON.stringify({ since: defaultSince, until: defaultUntil });
    }

    // Build parameters for the Meta Insights API.
    // Using level: "campaign" groups results by campaign.
    const insightsParams = {
      access_token: accessToken,
      time_range: timeRange,
      level: "campaign", // Groups by campaign.
      fields: "date_start,spend,actions,ctr,cpc,impressions,clicks,campaign_id,campaign_name",
    };

    // DEBUG: Log the request.
    const insightsUrl = `https://graph.facebook.com/v15.0/act_${adAccountId}/insights`;
    console.log("Requesting Meta Insights with URL:", insightsUrl);
    console.log("Request parameters:", insightsParams);

    // Call the Meta Graph API.
    const metaResponse = await axios.get(insightsUrl, { params: insightsParams });
    console.log("Meta Insights response:", metaResponse.data);
    const insights = metaResponse.data.data || [];

    // Initialize aggregates and campaign-level aggregation.
    let totalSpend = 0;
    let totalRevenue = 0;
    let totalOrders = 0;
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalWebsitePurchases = 0;
    const labels = [];
    const spendData = [];
    const campaignsMap = {};

    insights.forEach((item) => {
      const spend = parseFloat(item.spend);
      totalSpend += spend;
      totalImpressions += parseInt(item.impressions || 0);
      totalClicks += parseInt(item.clicks || 0);

      // "purchase" action for orders.
      const purchaseAction = item.actions
        ? item.actions.find((a) => a.action_type === "purchase")
        : null;
      const orders = purchaseAction ? parseInt(purchaseAction.value) : 0;
      totalOrders += orders;
      // Revenue: replace this dummy calculation with your actual logic if needed.
      const revenue = orders * 100;
      totalRevenue += revenue;

      // "website_purchase" action.
      const websitePurchaseAction = item.actions
        ? item.actions.find((a) => a.action_type === "website_purchase")
        : null;
      const websitePurchases = websitePurchaseAction ? parseInt(websitePurchaseAction.value) : 0;
      totalWebsitePurchases += websitePurchases;

      labels.push(item.date_start);
      spendData.push(spend);

      // Aggregate campaign-level data.
      const campaignId = item.campaign_id;
      const campaignName = item.campaign_name;
      if (campaignId) {
        if (!campaignsMap[campaignId]) {
          campaignsMap[campaignId] = { name: campaignName, spend: 0, orders: 0, revenue: 0, websitePurchases: 0 };
        }
        campaignsMap[campaignId].spend += spend;
        campaignsMap[campaignId].orders += orders;
        campaignsMap[campaignId].revenue += revenue;
        campaignsMap[campaignId].websitePurchases += websitePurchases;
      }
    });

    // Dashboard card data.
    const totalCollection = [
      { bgColor: "#09347F", title: "Amount Spend", rupees: `₹${totalSpend.toFixed(2)}` },
      { bgColor: "#4489C8", title: "Total Revenue", rupees: `₹${totalRevenue.toFixed(2)}` },
      { bgColor: "#B391CC", title: "Total Orders", rupees: totalOrders },
    ];

    const amountSpend = [
      {
        bgColor: "#F49342",
        title: "CPP",
        rupees: totalOrders > 0 ? `₹${(totalSpend / totalOrders).toFixed(2)}` : "N/A",
      },
      {
        bgColor: "#AB55FF",
        title: "ROAS",
        rupees: totalSpend > 0 ? `${((totalRevenue / totalSpend) * 100).toFixed(2)}%` : "N/A",
      },
      {
        bgColor: "#FDC00F",
        title: "CTR",
        rupees: totalImpressions > 0 ? `${((totalClicks / totalImpressions) * 100).toFixed(2)}%` : "N/A",
      },
      {
        bgColor: "#7700D2",
        title: "CPC",
        rupees: totalClicks > 0 ? `₹${(totalSpend / totalClicks).toFixed(2)}` : "N/A",
      },
    ];

    const chartData = {
      labels,
      datasets: [
        {
          data: spendData,
          label: "Spend",
          borderColor: "#2453FF",
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    // Build campaigns array (table data).
    const campaigns = Object.keys(campaignsMap).map((campaignId) => {
      const camp = campaignsMap[campaignId];
      return {
        name: camp.name,
        spend: `₹${camp.spend.toFixed(2)}`,
        orders: camp.orders,
        purchase: camp.orders > 0 ? `₹${(camp.spend / camp.orders).toFixed(2)}` : "N/A",
        sales: `₹${camp.revenue.toFixed(2)}`,
        roas: camp.spend > 0 ? `${((camp.revenue / camp.spend) * 100).toFixed(2)}%` : "N/A",
      };
    });

    // Compute Revenue Distribution (Campaign Revenue Distribution).
    const campaignRevenueArray = Object.values(campaignsMap).sort((a, b) => b.revenue - a.revenue);
    let revenueDistribution = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    if (campaignRevenueArray.length > 0) {
      if (campaignRevenueArray.length >= 2) {
        revenueDistribution.labels.push(campaignRevenueArray[0].name);
        revenueDistribution.datasets[0].data.push(Math.round(campaignRevenueArray[0].revenue));
        revenueDistribution.labels.push(campaignRevenueArray[1].name);
        revenueDistribution.datasets[0].data.push(Math.round(campaignRevenueArray[1].revenue));
        const otherRevenue = campaignRevenueArray.slice(2).reduce((acc, c) => acc + c.revenue, 0);
        revenueDistribution.labels.push("Other");
        revenueDistribution.datasets[0].data.push(Math.round(otherRevenue));
      } else {
        revenueDistribution.labels.push(campaignRevenueArray[0].name);
        revenueDistribution.datasets[0].data.push(Math.round(campaignRevenueArray[0].revenue));
      }
      revenueDistribution.datasets[0].backgroundColor = ["#4C45E3", "#2453FF", "#1FC105"].slice(0, revenueDistribution.labels.length);
    }

    // Compute Orders Distribution (Campaign Orders Distribution).
    const campaignOrdersArray = Object.values(campaignsMap).sort((a, b) => b.orders - a.orders);
    let ordersDistribution = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    if (campaignOrdersArray.length > 0) {
      if (campaignOrdersArray.length >= 2) {
        ordersDistribution.labels.push(campaignOrdersArray[0].name);
        ordersDistribution.datasets[0].data.push(campaignOrdersArray[0].orders);
        ordersDistribution.labels.push(campaignOrdersArray[1].name);
        ordersDistribution.datasets[0].data.push(campaignOrdersArray[1].orders);
        const otherOrders = campaignOrdersArray.slice(2).reduce((acc, c) => acc + c.orders, 0);
        ordersDistribution.labels.push("Other");
        ordersDistribution.datasets[0].data.push(otherOrders);
      } else {
        ordersDistribution.labels.push(campaignOrdersArray[0].name);
        ordersDistribution.datasets[0].data.push(campaignOrdersArray[0].orders);
      }
      ordersDistribution.datasets[0].backgroundColor = ["#FDC00F", "#7700D2", "#117899"].slice(0, ordersDistribution.labels.length);
    }

    // Update Impressions and Clicks distributions with more meaningful labels.
    const impressionsDistribution = {
      labels: ["High Impressions", "Moderate Impressions", "Low Impressions"],
      datasets: [
        {
          data: [
            Math.round(totalImpressions * 0.5),
            Math.round(totalImpressions * 0.3),
            totalImpressions - Math.round(totalImpressions * 0.5) - Math.round(totalImpressions * 0.3),
          ],
          backgroundColor: ["#F16C20", "#ECAA38", "#7700D2"],
        },
      ],
    };

    const clicksDistribution = {
      labels: ["High Clicks", "Moderate Clicks", "Low Clicks"],
      datasets: [
        {
          data: [
            Math.round(totalClicks * 0.4),
            Math.round(totalClicks * 0.4),
            totalClicks - Math.round(totalClicks * 0.4) - Math.round(totalClicks * 0.4),
          ],
          backgroundColor: ["#117899", "#0F5B78", "#1FC105"],
        },
      ],
    };

    const websitePurchaseDistribution = (() => {
      const campaignWPArray = Object.values(campaignsMap).sort((a, b) => b.websitePurchases - a.websitePurchases);
      let wpDistribution = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
      if (campaignWPArray.length > 0) {
        if (campaignWPArray.length >= 2) {
          wpDistribution.labels.push(campaignWPArray[0].name);
          wpDistribution.datasets[0].data.push(Math.round(campaignWPArray[0].websitePurchases));
          wpDistribution.labels.push(campaignWPArray[1].name);
          wpDistribution.datasets[0].data.push(Math.round(campaignWPArray[1].websitePurchases));
          const otherWP = campaignWPArray.slice(2).reduce((acc, c) => acc + c.websitePurchases, 0);
          wpDistribution.labels.push("Other");
          wpDistribution.datasets[0].data.push(Math.round(otherWP));
        } else {
          wpDistribution.labels.push(campaignWPArray[0].name);
          wpDistribution.datasets[0].data.push(Math.round(campaignWPArray[0].websitePurchases));
        }
        wpDistribution.datasets[0].backgroundColor = ["#4C45E3", "#2453FF", "#1FC105"].slice(0, wpDistribution.labels.length);
      }
      return wpDistribution;
    })();

    const costPerWebsitePurchase = totalWebsitePurchases > 0 ? (totalSpend / totalWebsitePurchases).toFixed(2) : "N/A";

    return Response.success({
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: {
        totalCollection,
        amountSpend,
        chartData,
        campaigns,
        revenueDistribution,
        ordersDistribution,
        impressionsDistribution,
        clicksDistribution,
        websitePurchaseDistribution,
        costPerWebsitePurchase,
      },
    });
  } catch (error) {
    console.error(
      "Error in getMetaData:",
      error.response ? error.response.data : error.message
    );
    return handleException(logger, res, error);
  }
};

module.exports = { getMetaData };
