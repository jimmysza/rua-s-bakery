
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  isVisible: boolean;
  createdAt: number;
  stock: number;
  preparation?: string;
  materials?: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  phone: string;
  address: string;
  username: string;
  password?: string;
  lat?: number;
  lng?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type View = 'shop' | 'admin' | 'login' | 'contact' | 'profile';
