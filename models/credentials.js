const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const credentials = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    platform: {
      type: String,
      enum: [
        "shopify",
        "woocommerce",
        "meta",
        "google",
        "shiprocket",
        "delhivery",
        "ithinklogistics",
      ],
      required: true,
    },
    meta: {
      accessToken: String,
      generatedDate: String,
      adAccountId: { type: String, default: null }, // New field for ad account id
    },
    shopify: {
      appInstalled: Boolean,
      shop: String,
      appKey: String,
      appSecret: String,
      accessToken: String,
      state: String,
      generatedDate: String,
    },
    woocommerce: {
      storeUrl: String,
      consumerKey: String,
      consumerSecret: String,
      generatedDate: String,
    },
    google: {
      refresh_token: String,
      access_token: String,
      expiry_date: String,
      googleConnected: { type: Boolean, default: false },
      generatedDate: String,
    },
    // Shippings
    shiprocket: {
      email: String,
      password: String,
      generatedDate: { type: Date },
      authToken: {
        token: String,
        generatedDate: { type: Date },
      },
    },
    // Delhivery
    delhivery: {
      apiToken: String,
      generatedDate: String,
    },
    // Ithinklogistics
    ithinklogistics: {
      baseUrl: String,
      apiKey: String,
      secretKey: String,
      generatedDate: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("credentials", credentials);
