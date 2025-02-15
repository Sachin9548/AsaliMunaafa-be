const axios = require("axios");
const Credentials = require("../../../models/credentials");
const Response = require("../../../helpers/response");
const { STATUS_CODE, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");

const fetchMarketingOverview = async (req, res) => {
  // Assume that your authentication middleware sets req.userId and req.logger
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

    // Get basic ad account info.
    const accountInfoResponse = await axios.get(
      `https://graph.facebook.com/v15.0/act_${adAccountId}`,
      {
        params: {
          access_token: accessToken,
          fields: "name,account_status",
        },
      }
    );
    const accountInfo = accountInfoResponse.data;

    // Build parameters for the insights API.
    const { since, until } = req.query;
    const insightsParams = {
      access_token: accessToken,
      fields: "spend,impressions,clicks,cpc,ctr,reach,frequency",
    };

    // If the frontend provides both since and until, use them;
    // Otherwise, default to a 2-year range ending today.
    if (since && until) {
      insightsParams.time_range = JSON.stringify({ since, until });
    } else {
      const today = new Date();
      const twoYearsAgo = new Date(today);
      twoYearsAgo.setFullYear(today.getFullYear() - 2);
      const defaultSince = twoYearsAgo.toISOString().split("T")[0];
      const defaultUntil = today.toISOString().split("T")[0];
      insightsParams.time_range = JSON.stringify({ since: defaultSince, until: defaultUntil });
    }

    // Fetch ad insights based on the given time range.
    const insightsResponse = await axios.get(
      `https://graph.facebook.com/v15.0/act_${adAccountId}/insights`,
      { params: insightsParams }
    );
    const insightsData =
      insightsResponse.data.data && insightsResponse.data.data[0]
        ? insightsResponse.data.data[0]
        : {};

    // Prepare the marketing data object.
    const marketingData = {
      adAccountName: accountInfo.name,
      accountStatus: accountInfo.account_status,
      spend: insightsData.spend ? `₹${insightsData.spend}` : "N/A",
      impressions: insightsData.impressions || "N/A",
      clicks: insightsData.clicks || "N/A",
      cpc: insightsData.cpc ? `₹${insightsData.cpc}` : "N/A",
      ctr: insightsData.ctr ? `${insightsData.ctr}%` : "N/A",
      reach: insightsData.reach || "N/A",
      frequency: insightsData.frequency || "N/A",
    };

    return Response.success({
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: marketingData,
    });
  } catch (error) {
    return handleException(logger, res, error);
  }
};

module.exports = { fetchMarketingOverview };
