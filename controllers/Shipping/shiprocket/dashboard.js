const Credentials = require("../../../models/credentials");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");
const Response = require("../../../helpers/response");
const axios = require("axios");
require("dotenv").config();

// Allow large responses if needed
axios.defaults.maxContentLength = Infinity;
axios.defaults.maxBodyLength = Infinity;

const dashboard = async (req, res) => {
const { logger, userId } = req;
console.log("Request received in dashboard endpoint");

try {
// 1. Retrieve Shiprocket credentials.
const credentialRecord = await Credentials.findOne({ platform: "shiprocket", userId });
if (
!credentialRecord ||
!credentialRecord.shiprocket ||
!credentialRecord.shiprocket.authToken.token
) {
console.error("Authorization failed: Invalid credentials");
return Response.error({
res,
status: STATUS_CODE.BAD_REQUEST,
msg: ERROR_MSGS.AUTHORIZATION_FAILED,
});
}
const USER_TOKEN = credentialRecord.shiprocket.authToken.token;
const SHIPROCKET_API_BASE_URL = "https://apiv2.shiprocket.in/v1/external";

// 2. Helper function to fetch data.
const fetchData = async (endpoint) => {
const url = `${SHIPROCKET_API_BASE_URL}${endpoint}`;
console.log(`Fetching data from: ${url}`);
try {
const response = await axios.get(url, {
headers: { Authorization: `Bearer ${USER_TOKEN}` },
timeout: 30000,
});
console.log(`Success fetching ${endpoint}. Data length: ${JSON.stringify(response.data).length}`);
return response.data;
} catch (err) {
if (err.response && err.response.status === 404) {
console.warn(`Warning: ${endpoint} returned 404. Returning empty data.`);
return {};
}
if (err.response) {
console.error(`Error fetching ${endpoint}: Status ${err.response.status} -`, err.response.data);
} else {
console.error(`Error fetching ${endpoint}:`, err.message);
}
throw err;
}
};

// 3. Fetch endpoints concurrently.
const [orders, shipments, returnsData, tracking] = await Promise.all([
fetchData("/orders"),
fetchData("/shipments"),
fetchData("/orders/processing/return"),
fetchData("/tracking")
]);

// --- Debug logs for returns ---
console.log("DEBUG: Returns data:", returnsData);

// 4. Compute metrics.
// Orders: Use meta pagination total if available.
const totalOrders = orders.meta && orders.meta.pagination && orders.meta.pagination.total
? Number(orders.meta.pagination.total)
: (orders.data ? orders.data.length : 0);
// Total Sales: Prefer meta.total_sales; else, sum current page.
const totalSales = orders.meta && orders.meta.total_sales
? Number(orders.meta.total_sales)
: orders.data
? orders.data.reduce((acc, order) => {
return acc + (Number(order.order_total) || Number(order.total) || Number(order.order_value) || 0);
}, 0)
: 0;

// Shipments: Use shipments.data array.
const shipmentsArray = shipments.data || [];
console.log("DEBUG: Shipments statuses:", shipmentsArray.map(s => s.status));
let pickupPending = 0, intransit = 0, delivered = 0;
shipmentsArray.forEach(s => {
const st = s.status ? s.status.toLowerCase() : "";
// Adjust these conditions based on actual status strings from your API.
if (st.includes("pickup")) {
pickupPending++;
} else if (st.includes("in transit")) {
intransit++;
} else if (st.includes("deliver")) {
delivered++;
}
});
const shipmentsTotal = shipments.meta && shipments.meta.pagination && shipments.meta.pagination.total
? Number(shipments.meta.pagination.total)
: shipmentsArray.length;

// Returns: Ensure returnsData.data is an array.
let returnsArray = [];
if (Array.isArray(returnsData.data)) {
returnsArray = returnsData.data;
} else if (returnsData.data) {
// If it's a single object, wrap it in an array.
returnsArray = [returnsData.data];
}
const returnsTotal = returnsData.meta && returnsData.meta.pagination && returnsData.meta.pagination.total
? Number(returnsData.meta.pagination.total)
: returnsArray.length;

// Process returns statuses.
let ndrCount = 0, rtoCount = 0, rtoInTransCount = 0, rtoDeliveredCount = 0;
returnsArray.forEach(r => {
const status = r.status ? r.status.toLowerCase() : "";
// Adjust these conditions based on actual return status strings.
if (status.includes("ndr")) {
ndrCount++;
}
if (status.includes("return pending") || status.includes("rto pending")) {
rtoCount++;
}
if (status.includes("rto in transit")) {
rtoInTransCount++;
}
if (status.includes("rto delivered")) {
rtoDeliveredCount++;
}
});

// 5. Build pie chart objects.
const shipmentsStatusPie = {
labels: ["Pickup Pending", "In Transit", "Delivered"],
datasets: [
{
data: [pickupPending, intransit, delivered],
backgroundColor: ["#FFAA00", "#2453FF", "#1FC105"]
}
]
};

const returnsStatusPie = {
labels: ["NDR", "RTO", "RTO In Transit", "RTO Delivered"],
datasets: [
{
data: [ndrCount, rtoCount, rtoInTransCount, rtoDeliveredCount],
backgroundColor: ["#F16C20", "#ECAA38", "#7700D2", "#117899"]
}
]
};

const ordersStatusPie = {
labels: ["Total Orders", "Total Sales"],
datasets: [
{
data: [totalOrders, totalSales],
backgroundColor: ["#B391CC", "#4489C8"]
}
]
};

// 6. Build final dashboardData object.
const dashboardData = {
metrics: {
totalOrders,
totalSales,
shipmentsTotal,
pickupPending,
intransit,
delivered,
returnsTotal,
ndr: ndrCount,
rto: rtoCount,
rtoInTrans: rtoInTransCount,
rtoDelivered: rtoDeliveredCount
},
pieCharts: {
shipmentsStatus: shipmentsStatusPie,
returnsStatus: returnsStatusPie,
ordersStatus: ordersStatusPie
}
};

console.log("Successfully fetched dashboard data", dashboardData);
return Response.success({
res,
status: STATUS_CODE.OK,
msg: INFO_MSGS.SUCCESS,
data: dashboardData
});
} catch (error) {
console.error("Error fetching dashboard data:", error.message);
return handleException(logger, res, error);
}
};

module.exports = { dashboard };