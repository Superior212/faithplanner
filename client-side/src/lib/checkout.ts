export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem {
  id: string;

  product: {
    id: string;

    name: string;

    price: number;

    description: string;

    image: string;

    category: string;

    teaser?: number;
  };

  quantity: number;
}

export interface LocalCartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  product: {
    teaser?: number;
  };
}

export interface CustomFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface CheckoutFormProps {
  formData: CustomFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}
