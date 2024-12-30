// const fetch = require('node-fetch');

// // Configuration object to store credentials
// const config = {
//     clientId: process.env.PAYPAL_CLIENT_ID,
//     clientSecret: process.env.PAYPAL_CLIENT_SECRET,
//     baseURL: 'https://api-m.sandbox.paypal.com'  // Use this for sandbox environment
// };

// const generateAccessToken = async () => {
//     if (!config.clientId || !config.clientSecret) {
//         throw new Error('PayPal credentials are missing. Please ensure PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET environment variables are set.');
//     }

//     const auth = Buffer.from(config.clientId + ":" + config.clientSecret).toString("base64");
//     const response = await fetch(`${config.baseURL}/v1/oauth2/token`, {
//         method: "POST",
//         body: "grant_type=client_credentials",
//         headers: {
//             Authorization: `Basic ${auth}`,
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//     });

//     const data = await response.json();
//     if (!data.access_token) {
//         throw new Error(`Failed to generate access token: ${JSON.stringify(data)}`);
//     }
//     return data.access_token;
// };

// const createOrder = async (items, amount) => {
//     try {
//         const accessToken = await generateAccessToken();

//         const response = await fetch(`${config.baseURL}/v2/checkout/orders`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${accessToken}`,
//             },
//             body: JSON.stringify({
//                 intent: "CAPTURE",
//                 purchase_units: [
//                     {
//                         items: items.map(item => ({
//                             name: item.name,
//                             quantity: item.quantity,
//                             unit_amount: {
//                                 currency_code: item.unit_amount.currency_code,
//                                 value: item.unit_amount.value
//                             }
//                         })),
//                         amount: {
//                             currency_code: amount.currency_code,
//                             value: amount.value,
//                             breakdown: {
//                                 item_total: {
//                                     currency_code: amount.breakdown.item_total.currency_code,
//                                     value: amount.breakdown.item_total.value
//                                 },
//                                 shipping: {
//                                     currency_code: amount.breakdown.shipping.currency_code,
//                                     value: amount.breakdown.shipping.value
//                                 },
//                                 tax_total: {
//                                     currency_code: amount.breakdown.tax_total.currency_code,
//                                     value: amount.breakdown.tax_total.value
//                                 }
//                             }
//                         }
//                     },
//                 ],
//             }),
//         });

//         const data = await response.json();
//         if (response.status >= 400) {
//             throw new Error(`PayPal API error: ${response.status} ${response.statusText}. Details: ${JSON.stringify(data)}`);
//         }
//         return data;
//     } catch (error) {
//         throw new Error(`Error creating PayPal order: ${error.message}`);
//     }
// };

// const capturePayment = async (orderId) => {
//     try {
//         const accessToken = await generateAccessToken();
//         const response = await fetch(`${config.baseURL}/v2/checkout/orders/${orderId}/capture`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });

//         const data = await response.json();
//         if (response.status >= 400) {
//             throw new Error(`PayPal API error: ${response.status} ${response.statusText}. Details: ${JSON.stringify(data)}`);
//         }
//         return data;
//     } catch (error) {
//         throw new Error(`Error capturing PayPal payment: ${error.message}`);
//     }
// };

// // Function to initialize the service with credentials
// const initialize = (clientId, clientSecret, isProduction = false) => {
//     config.clientId = clientId;
//     config.clientSecret = clientSecret;
//     config.baseURL = isProduction
//         ? 'https://api-m.paypal.com'
//         : 'https://api-m.sandbox.paypal.com';
// };

// module.exports = {
//     initialize,
//     createOrder,
//     capturePayment
// };