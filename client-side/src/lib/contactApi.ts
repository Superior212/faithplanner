import axios from "axios";
import type { ContactInfo, OrderData } from "./type";

const API_URL =  "http://localhost:3000";

export const api = {
  submitContact: async (data: ContactInfo) => {
    return axios.post(`${API_URL}/api/contact`, data);
  },

  createOrder: async (
    paypalOrderId: string,
    contactInfo: ContactInfo,
    orderDetails: OrderData
  ) => {
    return axios.post(`${API_URL}/api/orders`, {
      paypalOrderId,
      contactInfo,
      orderDetails,
    });
  },
};
