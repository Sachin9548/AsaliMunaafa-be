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
    const insightsParams = {
      access_token: accessToken,
      time_range: timeRange,
      level: "campaign", // Groups by campaign.
      fields:
        "date_start,spend,actions,action_values,ctr,cpc,impressions,clicks,campaign_id,campaign_name",
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
      const impressions = parseInt(item.impressions || 0);
      totalImpressions += impressions;
      const clicks = parseInt(item.clicks || 0);
      totalClicks += clicks;

      // Retrieve "purchase" action details for order count.
      const purchaseAction = item.actions
        ? item.actions.find((a) => a.action_type === "purchase")
        : null;
      const orders = purchaseAction ? parseInt(purchaseAction.value) : 0;
      totalOrders += orders;

      // Use actual revenue from Meta if available via action_values.
      const revenueAction = item.action_values
        ? item.action_values.find((a) => a.action_type === "purchase")
        : null;
      const revenue = revenueAction
        ? parseFloat(revenueAction.value)
        : orders * 100; // Fallback dummy calculation.
      totalRevenue += revenue;

      // Retrieve website purchase data.
      let websitePurchases = 0;
      if (item.actions) {
        // Check for both 'website_purchase' and an alternative like 'offsite_conversion.fb_pixel_purchase'
        const websitePurchaseAction = item.actions.find(
          (a) =>
            a.action_type === "website_purchase" ||
            a.action_type === "offsite_conversion.fb_pixel_purchase"
        );
        websitePurchases = websitePurchaseAction ? parseInt(websitePurchaseAction.value) : 0;
      }
      totalWebsitePurchases += websitePurchases;

      labels.push(item.date_start);
      spendData.push(spend);

      // Aggregate campaign-level data (including impressions and clicks).
      const campaignId = item.campaign_id;
      const campaignName = item.campaign_name;
      if (campaignId) {
        if (!campaignsMap[campaignId]) {
          campaignsMap[campaignId] = {
            name: campaignName,
            spend: 0,
            orders: 0,
            revenue: 0,
            websitePurchases: 0,
            impressions: 0,
            clicks: 0,
          };
        }
        campaignsMap[campaignId].spend += spend;
        campaignsMap[campaignId].orders += orders;
        campaignsMap[campaignId].revenue += revenue;
        campaignsMap[campaignId].websitePurchases += websitePurchases;
        campaignsMap[campaignId].impressions += impressions;
        campaignsMap[campaignId].clicks += clicks;
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
        rupees: totalSpend > 0 ? `${(totalRevenue / totalSpend).toFixed(2)}X` : "N/A",
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

    // Build campaigns array for table display.
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

    // Generate dynamic pie chart distributions using all campaigns.
    const colorPalette = [
      "#4C45E3",
      "#2453FF",
      "#1FC105",
      "#FDC00F",
      "#7700D2",
      "#117899",
      "#F16C20",
      "#ECAA38",
      "#FF5733",
      "#33FF57",
    ];

    // Revenue Distribution (all campaigns).
    let revenueDistribution = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    Object.values(campaignsMap).forEach((camp, index) => {
      revenueDistribution.labels.push(camp.name);
      revenueDistribution.datasets[0].data.push(Math.round(camp.revenue));
      revenueDistribution.datasets[0].backgroundColor.push(colorPalette[index % colorPalette.length]);
    });

    // Orders Distribution (all campaigns).
    let ordersDistribution = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    Object.values(campaignsMap).forEach((camp, index) => {
      ordersDistribution.labels.push(camp.name);
      ordersDistribution.datasets[0].data.push(camp.orders);
      ordersDistribution.datasets[0].backgroundColor.push(colorPalette[index % colorPalette.length]);
    });

    // Impressions Distribution (all campaigns).
    let impressionsDistribution = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    Object.values(campaignsMap).forEach((camp, index) => {
      impressionsDistribution.labels.push(camp.name);
      impressionsDistribution.datasets[0].data.push(camp.impressions);
      impressionsDistribution.datasets[0].backgroundColor.push(colorPalette[index % colorPalette.length]);
    });

    // Clicks Distribution (all campaigns).
    let clicksDistribution = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    Object.values(campaignsMap).forEach((camp, index) => {
      clicksDistribution.labels.push(camp.name);
      clicksDistribution.datasets[0].data.push(camp.clicks);
      clicksDistribution.datasets[0].backgroundColor.push(colorPalette[index % colorPalette.length]);
    });

    // Website Purchase Distribution (all campaigns).
    let websitePurchaseDistribution = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    Object.values(campaignsMap).forEach((camp, index) => {
      websitePurchaseDistribution.labels.push(camp.name);
      websitePurchaseDistribution.datasets[0].data.push(camp.websitePurchases);
      websitePurchaseDistribution.datasets[0].backgroundColor.push(colorPalette[index % colorPalette.length]);
    });

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
