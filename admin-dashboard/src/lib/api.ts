const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchOrders(): Promise<Order[]> {
  const response = await fetch(`${API_BASE_URL}/orders`);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return response.json();
}

export interface Order {
  _id: string;
  contactInfo: {
    email: string;
    firstName: string;
    lastName: string;
  };
  total: number;
  paymentStatus: string;
  createdAt: string;
}
