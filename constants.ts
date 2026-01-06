
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pastel de Red Velvet',
    price: 35.00,
    description: 'Esponjoso pastel de chocolate con un toque rojo vibrante y crema de queso suave.',
    images: [
      'https://images.unsplash.com/photo-1586788680434-30d324631ffc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1616031037011-087000171abe?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=800'
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
      'https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Postres',
    isVisible: true,
    createdAt: Date.now() + 1,
    stock: 12,
    preparation: 'Merengue italiano con harina de almendras tamizada tres veces. Reposo de 30 min antes de hornear para lograr la "conchilla" perfecta.',
    materials: 'Almendra molida, Claras de huevo de granja, Azúcar glass, Ganache de chocolate belga.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  },
  {
    id: '3',
    name: 'Tarta de Frutos Rojos',
    price: 28.00,
    description: 'Base de galleta crujiente con crema pastelera y una selección premium de frutos del bosque.',
    images: [
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Tartas',
    isVisible: true,
    createdAt: Date.now() + 2,
    stock: 0,
    preparation: 'Masa sableé horneada a ciegas. Crema pastelera infusionada con vainilla de Papantla y frutas frescas de temporada.',
    materials: 'Mantequilla de Asturias, Vainilla natural, Frambuesas, Arándanos, Fresas orgánicas.'
  }
];

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin'
};

export const STORE_LOCATION = {
  lat: 11.0041,
  lng: -74.8070,
  address: "📍| Barranquilla / Ciudad Mallorquin"
};

export const WHATSAPP_NUMBER = '573045852792';
