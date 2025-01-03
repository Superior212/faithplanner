export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  featured?: boolean;
  subtitle?: string;
  img?: string;
  teaser?: number;
  customization?: {
    isGift: boolean;
    coverColor?: string;
    paperType?: string;
    customMessage?: string;
    recipientName?: string;
    recipientAddress?: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PayPalOrderData {
  purchase_units: {
    amount: {
      value: string;
      breakdown: {
        item_total: {
          value: string;
          currency_code: string;
        };
        shipping: {
          value: string;
          currency_code: string;
        };
        tax_total: {
          value: string;
          currency_code: string;
        };
      };
    };
    items: {
      name: string;
      quantity: number;
      unit_amount: {
        value: string;
        currency_code: string;
      };
    }[];
  }[];
}

export interface ContactInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface OrderData {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}
