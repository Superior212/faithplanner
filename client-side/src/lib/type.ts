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
}

export interface CartItem extends Product {
  quantity: number;
}
