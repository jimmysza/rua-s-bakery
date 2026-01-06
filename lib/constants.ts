
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pastel de Red Velvet',
    price: 35.00,
    description: 'Esponjoso pastel de chocolate con un toque rojo vibrante y crema de queso suave.',
    images: [
      'https://images.unsplash.com/photo-1586788680434-30d324631ffc?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Pasteles',
    isVisible: true,
    createdAt: Date.now(),
    stock: 5,
    preparation: 'Batido lento de cacao premium con suero de leche, horneado a 170°C y decorado con frosting de queso crema artesanal.',
    materials: 'Harina de trigo orgánica, Cacao puro, Queso crema, Remolacha natural para el color.'
  },
  {
    id: '2',
    name: 'Macarons Surtidos',
    price: 18.50,
    description: 'Caja de 6 macarons franceses artesanales de sabores variados.',
    images: [
      'https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Postres',
    isVisible: true,
    createdAt: Date.now() + 1,
    stock: 12,
    preparation: 'Merengue italiano con harina de almendras tamizada tres veces.',
    materials: 'Almendra molida, Claras de huevo de granja, Azúcar glass.'
  }
];

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'pastryadmin123'
};

export const STORE_LOCATION = {
  lat: 11.0041,
  lng: -74.8070,
  address: "📍| Barranquilla / Ciudad Mallorquin"
};

export const WHATSAPP_NUMBER = '573045852792';
