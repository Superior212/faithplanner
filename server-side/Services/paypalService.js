// const paypal = require('../config/paypal');

// class PayPalService {
//     async createOrder(items, amount) {
//         const create_payment_json = {
//             "intent": "sale",
//             "payer": {
//                 "payment_method": "paypal"
//             },
//             "transactions": [{
//                 "amount": {
//                     "currency": "USD",
//                     "total": amount.toString()
//                 },
//                 "description": "Your order description"
//             }]
//         };

//         return new Promise((resolve, reject) => {
//             paypal.payment.create(create_payment_json, function (error, payment) {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(payment);
//                 }
//             });
//         });
//     }

//     async capturePayment(paymentId, payerId) {
//         const execute_payment_json = {
//             "payer_id": payerId,
//             "transactions": [{
//                 "amount": {
//                     "currency": "USD",
//                     "total": amount.toString()
//                 }
//             }]
//         };

//         return new Promise((resolve, reject) => {
//             paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(payment);
//                 }
//             });
//         });
//     }
// }

// module.exports = new PayPalService();