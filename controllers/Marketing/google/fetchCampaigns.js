const { GoogleAdsApi } = require("google-ads-api");
const GoogleAccounts = require("../../../models/googleAccounts");
const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const fetchCampaigns = async (req, res) => {
  const { logger, userId, accessToken, refreshToken } = req;
  const { startDate, endDate } = req.query;

  try {
    if (
      !process.env.GOOGLE_CLIENT_ID ||
      !process.env.GOOGLE_CLIENT_SECRET ||
      !process.env.GOOGLE_DEVELOPER_TOKEN
    ) {
      const obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.ENVIRONMENT_VAR_MISSING,
      };
      return Response.error(obj);
    }

    if (!startDate || !endDate) {
      const message = !startDate
        ? `StartDate ${ERROR_MSGS.KEY_REQUIRED}`
        : `EndDate ${ERROR_MSGS.KEY_REQUIRED}`;
      let obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: message,
      };
      return Response.error(obj);
    }

    // Validate date formats
    if (startDate && !isValidDateFormat(startDate)) {
      const obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_DATE_FORMAT,
      };
      return Response.error(obj);
    }

    if (endDate && !isValidDateFormat(endDate)) {
      const obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_DATE_FORMAT,
      };
      return Response.error(obj);
    }

    const client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      developer_token: process.env.GOOGLE_DEVELOPER_TOKEN,
    });

    // Initialize OAuth2Client with your credentials
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    const customers = await GoogleAccounts.find({ userId });
    if (customers.length === 0) {
      const obj = {
        res,
        status: STATUS_CODE.OK,
        msg: ERROR_MSGS.DATA_NOT_FOUND,
      };
      return Response.success(obj);
    }

    let fetchCampaigns = [];

    const customerPromises = customers.map(async (item) => {
      if (!item.manager) {
        const customer = client.Customer({
          customer_id: item.customerId,
          login_customer_id: item.managingAccountID,
          refresh_token: accessToken,
        });

        try {
          const campaigns = await customer.query(`
            SELECT
              campaign.id,
              campaign.name,
              metrics.cost_micros,
              metrics.conversions,
              metrics.conversions_value,
              metrics.clicks,
              metrics.impressions
            FROM
              campaign
            WHERE
              segments.date BETWEEN '${startDate}' AND '${endDate}'
          `);

          fetchCampaigns = fetchCampaigns.concat(campaigns);
        } catch (queryError) {
          console.error("Error querying campaigns:", queryError);
        }
      }
    });

    // Wait for all customer queries to finish
    await Promise.all(customerPromises);

    // Calculate CPC, CTR, ROAS, and Cost Per Purchase
    fetchCampaigns = fetchCampaigns.map((campaign) => {
      const cost = campaign.metrics.cost_micros / 1e6;
      const conversions = campaign.metrics.conversions;
      const conversionsValue = campaign.metrics.conversions_value;
      const clicks = campaign.metrics.clicks;
      const impressions = campaign.metrics.impressions;

      // Handle ROAS and other calculations
      const roas = cost > 0 ? conversionsValue / cost : 0;
      const costPerPurchase = conversions > 0 ? cost / conversions : 0;
      const cpc = clicks > 0 ? cost / clicks : 0;
      const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

      return {
        id: campaign.campaign.id,
        name: campaign.campaign.name,
        amountSpend: parseFloat(cost.toFixed(2)),
        totalOrders: conversions,
        totalSales: parseFloat(conversionsValue.toFixed(2)),
        roas: parseFloat(roas.toFixed(2)),
        costPerPurchase: parseFloat(costPerPurchase.toFixed(2)),
        cpc: parseFloat(cpc.toFixed(2)),
        ctr: parseFloat(ctr.toFixed(2)),
      };
    });

    // Calculate totals
    const campaignsTotals = fetchCampaigns.reduce(
      (acc, campaign) => {
        acc.totalAmountSpend += parseFloat(campaign.amountSpend);
        acc.totalOrders += campaign.totalOrders;
        acc.totalSales += parseFloat(campaign.totalSales);
        acc.totalRoas += parseFloat(campaign.roas);
        acc.totalCostPerPurchase += parseFloat(campaign.costPerPurchase);
        acc.totalCpc += parseFloat(campaign.cpc);
        acc.totalCtr += parseFloat(campaign.ctr);
        return acc;
      },
      {
        totalAmountSpend: 0,
        totalOrders: 0,
        totalSales: 0,
        totalRoas: 0,
        totalCostPerPurchase: 0,
        totalCpc: 0,
        totalCtr: 0,
      }
    );

    // Format totals to 2 decimal places
    campaignsTotals.totalAmountSpend = parseFloat(
      campaignsTotals.totalAmountSpend.toFixed(2)
    );
    campaignsTotals.totalRoas = parseFloat(
      campaignsTotals.totalRoas.toFixed(2)
    );
    campaignsTotals.totalCostPerPurchase = parseFloat(
      campaignsTotals.totalCostPerPurchase.toFixed(2)
    );
    campaignsTotals.totalCpc = parseFloat(campaignsTotals.totalCpc.toFixed(2));
    campaignsTotals.totalCtr = parseFloat(campaignsTotals.totalCtr.toFixed(2));
    campaignsTotals.totalOrders = parseFloat(
      campaignsTotals.totalOrders.toFixed(2)
    );
    campaignsTotals.totalSales = parseFloat(
      campaignsTotals.totalSales.toFixed(2)
    );

    if (fetchCampaigns.length === 0) {
      const obj = {
        res,
        status: STATUS_CODE.OK,
        msg: ERROR_MSGS.DATA_NOT_FOUND,
      };
      return Response.success(obj);
    }

    const obj = {
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: {
        campaignsTotals: campaignsTotals,
        campaigns: fetchCampaigns,
      },
    };
    return Response.success(obj);
  } catch (error) {
    console.error("Error fetching Google Ads campaigns:", error);
    return handleException(logger, res, error);
  }
};

const isValidDateFormat = (dateStr) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateStr);
};

module.exports = {
  fetchCampaigns,
};
