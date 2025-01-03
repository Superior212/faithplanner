const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://faithplanner-server.vercel.app/api";

export async function fetchOrders(): Promise<Order[]> {
  const response = await fetch(`${API_BASE_URL}/orders`);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return response.json();
}

// export interface Order {
//   _id: string;
//   contactInfo: {
//     email: string;
//     firstName: string;
//     lastName: string;
//   };
//   total: number;
//   paymentStatus: string;
//   createdAt: string;
// }

export interface Order {
  _id: string;

  contactInfo: {
    email: string;

    firstName: string;

    lastName: string;

    address: string;

    city: string;

    state: string;

    zipCode: string;
  };

  total: number;

  paymentStatus: string;

  createdAt: string;
}
