const { GoogleAdsApi } = require("google-ads-api");
const GoogleAccounts = require("../../../models/googleAccounts");
const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const { ObjectId } = require("mongoose").Types;
require("dotenv").config();

// const fetchCustomers = async (req, res) => {
//   const { logger, accessToken, refreshToken } = req;
//   try {
//     const client = new GoogleAdsApi({
//       client_id: process.env.GOOGLE_CLIENT_ID,
//       client_secret: process.env.GOOGLE_CLIENT_SECRET,
//       developer_token: process.env.GOOGLE_DEVELOPER_TOKEN,
//     });

//     const customers = await client.listAccessibleCustomers(accessToken);
//     const customerIds = customers.resource_names.map(
//       (name) => name.split("/")[1]
//     );

//     const transformedClients = await Promise.all(
//       customerIds.map(async (mainId) => {
//         const mcc = client.Customer({
//           customer_id: mainId,
//           refresh_token: refreshToken,
//           login_customer_id: mainId,
//         });

//         const clusterClients = await mcc.report({
//           entity: "customer_client",
//           attributes: [
//             "customer_client.id",
//             "customer_client.level",
//             "customer_client.manager",
//             "customer_client.resource_name",
//             "customer_client.descriptive_name",
//             "customer_client.client_customer",
//             "customer_client.applied_labels",
//             "customer_client.currency_code",
//             "customer_client.hidden",
//             "customer_client.status",
//             "customer_client.test_account",
//             "customer_client.time_zone",
//           ],
//         });

//         const nonTestAccounts = await clusterClients.filter(
//           (client) => !client.customer_client.test_account
//         );

//         return nonTestAccounts;
//       })
//     );
//     const fetchIsChecked = async (customerId) => {
//       const getData = await GoogleAccounts.find({
//         userId: new ObjectId(req.userId),
//         customerId: customerId,
//       });
//       return getData.length > 0;
//     };

//     const flattenedClients = transformedClients.flat();

//     const uniqueClientsMap = new Map();
//     await Promise.all(
//       flattenedClients.map(async (item) => {
//         const updatedClient = { ...item.customer_client };
//         updatedClient.isChecked = await fetchIsChecked(updatedClient.id);
//         updatedClient.customerId = updatedClient.id;

//         updatedClient.managingAccountID = parseInt(
//           updatedClient.resource_name.split("/")[1]
//         );
//         delete updatedClient.id;
//         // Add to map if not already present
//         if (!uniqueClientsMap.has(updatedClient.customerId)) {
//           uniqueClientsMap.set(updatedClient.customerId, updatedClient);
//         }

//         return updatedClient;
//       })
//     );

//     // Convert the map values to an array
//     const uniqueClients = Array.from(uniqueClientsMap.values());

//     const obj = {
//       res,
//       status: STATUS_CODE.OK,
//       msg: INFO_MSGS.SUCCESS,
//       data: uniqueClients,
//     };
//     return Response.success(obj);
//   } catch (error) {
//     console.error("Error fetching Google Ads campaigns:", error);
//     return handleException(logger, res, error.errors);
//   }
// };

const fetchCustomers = async (req, res) => {
  const { logger, accessToken, refreshToken } = req;
  try {
    const client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      developer_token: process.env.GOOGLE_DEVELOPER_TOKEN,
    });

    const customers = await client.listAccessibleCustomers(accessToken);
    console.log("customers :>> ", customers);
    const customerIds = customers.resource_names.map(
      (name) => name.split("/")[1]
    );
    console.log("customerIds :>> ", customerIds);

    const transformedClients = await Promise.all(
      customerIds.map(async (mainId) => {
        try {
          const mcc = client.Customer({
            customer_id: mainId,
            refresh_token: refreshToken,
            login_customer_id: mainId,
          });

          const clusterClients = await mcc.report({
            entity: "customer_client",
            attributes: [
              "customer_client.id",
              "customer_client.level",
              "customer_client.manager",
              "customer_client.resource_name",
              "customer_client.descriptive_name",
              "customer_client.client_customer",
              "customer_client.applied_labels",
              "customer_client.currency_code",
              "customer_client.hidden",
              "customer_client.status",
              "customer_client.test_account",
              "customer_client.time_zone",
            ],
          });

          const nonTestAccounts = clusterClients.filter(
            (client) => !client.customer_client.test_account
          );

          return nonTestAccounts;
        } catch (error) {
          console.error(`Error processing customer ID ${mainId}:`, error);
          // Return an empty array if there's an error for this ID
          return [];
        }
      })
    );

    const fetchIsChecked = async (customerId) => {
      const getData = await GoogleAccounts.find({
        userId: new ObjectId(req.userId),
        customerId: customerId,
      });
      return getData.length > 0;
    };

    const flattenedClients = transformedClients.flat();

    const uniqueClientsMap = new Map();
    await Promise.all(
      flattenedClients.map(async (item) => {
        const updatedClient = { ...item.customer_client };
        updatedClient.isChecked = await fetchIsChecked(updatedClient.id);
        updatedClient.customerId = updatedClient.id;

        updatedClient.managingAccountID = parseInt(
          updatedClient.resource_name.split("/")[1]
        );
        delete updatedClient.id;
        // Add to map if not already present
        if (!uniqueClientsMap.has(updatedClient.customerId)) {
          uniqueClientsMap.set(updatedClient.customerId, updatedClient);
        }

        return updatedClient;
      })
    );

    // Convert the map values to an array
    const uniqueClients = Array.from(uniqueClientsMap.values());

    const obj = {
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: uniqueClients,
    };
    return Response.success(obj);
  } catch (error) {
    console.error("Error fetching Google Ads campaigns:", error);
    return handleException(logger, res, error.errors);
  }
};

module.exports = {
  fetchCustomers,
};
