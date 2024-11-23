const fetch = require('node-fetch');
const BASE_URL = 'https://api-m.sandbox.paypal.com'; // Use this for sandbox environment

class PayPalService {
    constructor() {
        this.clientId = process.env.PAYPAL_CLIENT_ID;
        this.clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    }

    async generateAccessToken() {
        const auth = Buffer.from(this.clientId + ":" + this.clientSecret).toString("base64");
        const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        const data = await response.json();
        if (!data.access_token) {
            console.error('Failed to generate access token:', data);
            throw new Error(`Failed to generate access token: ${JSON.stringify(data)}`);
        }
        return data.access_token;
    }

    async createOrder(items, amount) {
        try {
            console.log('Generating access token...');
            const accessToken = await this.generateAccessToken();
            console.log('Access token generated successfully');

            console.log('Creating PayPal order with:', { items, amount });
            const response = await fetch(`${BASE_URL}/v2/checkout/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            items: items.map(item => ({
                                name: item.name,
                                quantity: item.quantity,
                                unit_amount: {
                                    currency_code: item.unit_amount.currency_code,
                                    value: item.unit_amount.value
                                }
                            })),
                            amount: {
                                currency_code: amount.currency_code,
                                value: amount.value,
                                breakdown: {
                                    item_total: {
                                        currency_code: amount.breakdown.item_total.currency_code,
                                        value: amount.breakdown.item_total.value
                                    },
                                    shipping: {
                                        currency_code: amount.breakdown.shipping.currency_code,
                                        value: amount.breakdown.shipping.value
                                    },
                                    tax_total: {
                                        currency_code: amount.breakdown.tax_total.currency_code,
                                        value: amount.breakdown.tax_total.value
                                    }
                                }
                            }
                        },
                    ],
                }),
            });
            const data = await response.json();
            console.log('PayPal API response:', JSON.stringify(data, null, 2));

            if (response.status >= 400) {
                console.error('PayPal API error:', response.status, response.statusText, data);
                throw new Error(`PayPal API error: ${response.status} ${response.statusText}. Details: ${JSON.stringify(data)}`);
            }
            if (!data.id) {
                console.error('Failed to create PayPal order:', data);
                throw new Error(`Failed to create PayPal order: ${JSON.stringify(data)}`);
            }
            return data;
        } catch (error) {
            console.error('Error in createOrder:', error);
            throw error;
        }
    }

    async capturePayment(orderId) {
        try {
            const accessToken = await this.generateAccessToken();
            const response = await fetch(`${BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            if (response.status >= 400) {
                console.error('PayPal API error:', response.status, response.statusText, data);
                throw new Error(`PayPal API error: ${response.status} ${response.statusText}. Details: ${JSON.stringify(data)}`);
            }
            return data;
        } catch (error) {
            console.error('Error in capturePayment:', error);
            throw error;
        }
    }
}

module.exports = new PayPalService();

