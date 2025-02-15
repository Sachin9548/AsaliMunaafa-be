// routes/auth.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Credential = require("../../models/credentials");
const { userAuth } = require("../../middleware/auth.js");

/**
 * Redirect user to Facebook login.
 * Now includes adAccountId in the state.
 */
router.get("/facebook", userAuth, (req, res) => {
  // Get origin, token, and adAccountId from query parameters.
  const { origin, token, adAccountId } = req.query;
  // Build a state object that includes the origin, token, and adAccountId.
  const stateData = { origin, token, adAccountId };
  const state = encodeURIComponent(JSON.stringify(stateData));

  // Construct Facebook OAuth URL with the state parameter.
  const facebookAuthURL =
    `https://www.facebook.com/v15.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}` +
    `&scope=email,ads_read,business_management` +
    `&state=${state}`;

  res.redirect(facebookAuthURL);
});

/**
 * Handle Facebook callback:
 *  - Exchanges the code for a token.
 *  - Parses the state to extract origin, token, and adAccountId.
 *  - Verifies the token, extracts user ID, and stores Meta credentials (including adAccountId).
 */
router.get("/facebook/callback", async (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).send("Authorization code not provided");
  }

  let parsedState = {};
  try {
    parsedState = JSON.parse(decodeURIComponent(state));
  } catch (e) {
    console.error("Failed to parse state:", e);
  }
  console.log("Parsed state:", parsedState);
  const { origin, token, adAccountId } = parsedState;

  // Remove "Bearer " prefix if present.
  let tokenToVerify = token;
  if (tokenToVerify.startsWith("Bearer ")) {
    tokenToVerify = tokenToVerify.slice(7).trimLeft();
  }

  let decoded;
  try {
    decoded = jwt.verify(tokenToVerify, process.env.USER_ACCESS_TOKEN);
  } catch (err) {
    console.error("Token verification failed in callback:", err);
    return res.status(401).send("Invalid token");
  }

  // Decrypt the userId from the token payload.
  const { decrypt } = require("../../helpers/encrypt-decrypt");
  const userId = decrypt(decoded.userId, process.env.USER_ENCRYPTION_KEY);

  try {
    // Exchange the code for a short‑lived token.
    const tokenResponse = await axios.post(
      "https://graph.facebook.com/v15.0/oauth/access_token",
      null,
      {
        params: {
          client_id: process.env.FACEBOOK_APP_ID,
          redirect_uri: process.env.REDIRECT_URI,
          client_secret: process.env.FACEBOOK_APP_SECRET,
          code: code,
        },
      }
    );
    const shortLivedToken = tokenResponse.data.access_token;

    // Exchange the short‑lived token for a long‑lived token.
    const longLivedResponse = await axios.get(
      "https://graph.facebook.com/v15.0/oauth/access_token",
      {
        params: {
          grant_type: "fb_exchange_token",
          client_id: process.env.FACEBOOK_APP_ID,
          client_secret: process.env.FACEBOOK_APP_SECRET,
          fb_exchange_token: shortLivedToken,
        },
      }
    );
    const longLivedToken = longLivedResponse.data.access_token;

    // Create a new credential document for Meta including the adAccountId.
    const newCredential = new Credential({
      platform: "meta",
      userId: userId,
      meta: {
        accessToken: longLivedToken,
        generatedDate: new Date().toISOString(),
        adAccountId: adAccountId, // Storing the ad account id.
      },
    });

    await newCredential.save();

    // Return an HTML page to notify the parent window and close the popup.
    res.send(`
      <html>
        <head>
          <title>Facebook Connected</title>
        </head>
        <body>
          <script>
            window.opener.postMessage({ type: 'fb_connected' }, "${origin}");
            setTimeout(() => window.close(), 1000);
          </script>
          <p>Facebook connected successfully. You can close this window.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error(
      "Error exchanging code for access token:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Failed to exchange code for access token");
  }
});

/**
 * Optional route to manually exchange a short‑lived token for a long‑lived token.
 */
router.get("/exchange-token", async (req, res) => {
  const shortLivedToken = req.query.short_token;
  if (!shortLivedToken) {
    return res.status(400).json({ error: "Short‑lived token not provided" });
  }
  try {
    const response = await axios.get("https://graph.facebook.com/v15.0/oauth/access_token", {
      params: {
        grant_type: "fb_exchange_token",
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        fb_exchange_token: shortLivedToken,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error exchanging token:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to exchange token", details: error.response?.data });
  }
});

module.exports = router;
