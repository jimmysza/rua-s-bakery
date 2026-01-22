
import { AlertTriangle, ArrowRight, Cake, CheckCircle2, Layers, Search } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import AdminLogin from '../components/AdminLogin';
import Cart from '../components/Cart';
import Contact from '../components/Contact';
import CustomerAuth from '../components/CustomerAuth';
import FAQ from '../components/FAQ';

import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductDetailsModal from '../components/ProductDetailsModal';
import Profile from '../components/Profile';
/* import { supabase } from '@/services/supabaseClient'; */ // This comment is already there, I should use the real import.
import CustomServices from '@/components/CustomService';
import HeroCarousel from '@/components/HeroCarousel';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { CartItem, CustomerUser, Product, View } from '../lib/types';
import { supabase } from './lib/supabase';

/* Heart, Search, Cake, CheckCircle2, AlertTriangle, ArrowRight, Layers,  */
export const STORE_LOCATION = {
  lat: 11.0041,
  lng: -74.8070,
  address: "📍| Barranquilla / Ciudad Mallorquin"
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('pastry_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('pastry_admin_session') === 'active';
  });

  const [customer, setCustomer] = useState<CustomerUser | null>(() => {
    const saved = localStorage.getItem('pastry_customer_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentView, setView] = useState<View>('shop');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: 'success', text: '' });
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel('public:products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        fetchProducts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      if (data) {
        setProducts(data as Product[]);
      }
    } catch (err) {
      console.error('Unexpected error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    localStorage.setItem('pastry_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setShowAllProducts(false);
  }, [activeCategory, searchQuery]);

  const categories = useMemo(() => {
    const cats = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];
    return cats;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;

      const isVisible = p.isVisible || currentView === 'admin';
      return matchesSearch && matchesCategory && isVisible;
    });
  }, [products, searchQuery, activeCategory, currentView]);

  const displayedProducts = useMemo(() => {
    if (showAllProducts) return filteredProducts;
    return filteredProducts.slice(0, 8);
  }, [filteredProducts, showAllProducts]);

  const handleAddToCart = (product: Product) => {
    const existingInCart = cart.find(item => item.product.id === product.id);
    const currentQty = existingInCart ? existingInCart.quantity : 0;



    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setToastMessage({ type: 'success', text: '¡Añadido al carrito!' });
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2000);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = item.quantity + delta;

        let validatedQty;
        // Si el producto no tiene stock (es por encargo), permitimos aumentar libremente (ej. hasta 1000)
        // Si tiene stock, respetamos el límite del stock disponible
        if (item.product.stock <= 0) {
          validatedQty = Math.max(1, newQty);
        } else {
          validatedQty = Math.max(1, Math.min(newQty, item.product.stock));
        }

        return { ...item, quantity: validatedQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const handleAdminLoginSuccess = () => {
    setCustomer(null);
    localStorage.removeItem('pastry_customer_session');
    setIsAdminLoggedIn(true);

    localStorage.setItem('pastry_admin_session', 'active');
    setView('admin');
  };

  const handleCustomerAuthSuccess = (user: CustomerUser) => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('pastry_admin_session');
    setCustomer(user);
    localStorage.setItem('pastry_customer_session', JSON.stringify(user));
    setView('shop');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setCustomer(null);
    localStorage.removeItem('pastry_admin_session');
    localStorage.removeItem('pastry_customer_session');
    setView('shop');
  };

  const handleShowDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  const addProduct = (data: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    if (confirm('¿Eliminar producto?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };


  const handleCustomerUpdate = (updatedUser: CustomerUser) => {
    setCustomer(updatedUser);
    localStorage.setItem('pastry_customer_session', JSON.stringify(updatedUser));
    setToastMessage({ type: 'success', text: 'Perfil actualizado' });
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-soft">
      <Navbar
        currentView={currentView}
        setView={setView}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        isAdmin={isAdminLoggedIn}
        customer={customer}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {showAddedToast && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] ${toastMessage.type === 'error' ? 'bg-red-600' : 'bg-accent'} text-white px-6 py-4 rounded-[2rem] flex items-center shadow-2xl backdrop-blur-md animate-bounce`}>
          {toastMessage.type === 'error' ? <AlertTriangle className="h-6 w-6 mr-3" /> : <CheckCircle2 className="h-6 w-6 text-green-400 mr-3" />}
          <span className="font-bold">{toastMessage.text}</span>
        </div>
      )}

      <main className="flex-grow" >

        {currentView === 'shop' && (
          <div className="">


            <HeroCarousel />

            <div id="catalog" className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-16 mb-16">
              <div className="flex items-center space-x-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-7 py-2.5 rounded-full whitespace-nowrap transition-all font-bold text-sm ${activeCategory === cat ? 'bg-primary text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-primary-light hover:text-primary'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Busca tu antojo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-3.5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-2 focus:ring-primary-light outline-none"
                />
              </div>
            </div>

            {displayedProducts.length > 0 ? (
              <div className="space-y-16" >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10  mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} onShowDetails={handleShowDetails} />
                  ))}
                </div>
                {filteredProducts.length > 8 && !showAllProducts && (
                  <div className="flex justify-center pt-8">
                    <button
                      onClick={() => setShowAllProducts(true)}
                      className="group flex items-center space-x-3 px-10 py-5 bg-white border-2 border-primary-light text-primary rounded-[2rem] font-bold hover:bg-primary hover:text-white transition-all shadow-lg"
                    >
                      <Layers className="h-5 w-5" />
                      <span>Ver más delicias</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
                <Cake className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 text-lg italic font-medium">No encontramos postres que coincidan...</p>
              </div>
            )}
          </div>
        )}

        {currentView === 'shop' && <CustomServices />}


        {currentView === 'contact' && <Contact />}
        {currentView === 'profile' && customer && <Profile customer={customer} onLogout={handleLogout} onBackToShop={() => setView('shop')} onUpdateProfile={handleCustomerUpdate} />}
        {currentView === 'login' && !isAdminLoggedIn && <AdminLogin onLogin={handleAdminLoginSuccess} onBack={() => setView('shop')} />}
        {currentView === 'admin' && isAdminLoggedIn && <AdminDashboard products={products} onAddProduct={addProduct} onUpdateProduct={updateProduct} onDeleteProduct={deleteProduct} />}
      </main>
      {currentView == "shop" && (<FAQ />)}

      <footer className="relative bg-primary text-white pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <img src="galletasFooter.jpg" alt="Bakery background" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-4">
              <h3 className="font-serif italic text-5xl mb-6">Ciudad Mallorquin</h3>
              <div className="text-sm tracking-wide space-y-2 uppercase opacity-90">
                <a href="tel:+573045852792">(+57) 304 585-2792</a>
                <p>Calle Principal, Local 4</p>
                <p>Puerto Colombia, ATL 081007</p>
                <p className="font-bold">nathalievalencia@uninorte.edu.co</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-serif italic text-5xl mb-6">Navegacion</h3>

              <ul className="text-sm tracking-widest space-y-3 uppercase opacity-90 font-medium">
                <li>
                  <button
                    onClick={() => {
                      setView('shop');
                      setTimeout(() => {
                        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                      }, 0);
                    }}
                    className="hover:text-gray-600"
                  >
                    Tienda
                  </button>
                </li>
                <li><button onClick={() => { setView('contact'); window.scrollTo(0, 0); }} className="hover:text-gray-600">Contacto</button></li>
                {!isAdminLoggedIn && <li><button onClick={() => { setView('login'); window.scrollTo(0, 0); }} className="hover:text-gray-600 transition-colors">Administración</button></li>}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif italic text-5xl mb-6">Horarios</h3>
              <div className="text-sm tracking-widest space-y-3 uppercase opacity-90 font-medium">
                <p>LUN - JUE: 8:00 AM - 7:00 PM</p>
                <p>VIE - SAB: 8:00 AM - 10:00 PM</p>
                <p>DOMINGO: 9:00 AM - 2:00 PM</p>
              </div>
            </div>


          </div>

          <div className="flex justify-center space-x-8 mt-20">
            {[<Facebook className="h-5 w-5" />, <Twitter className="h-5 w-5" />, <Instagram className="h-5 w-5" />].map((icon, i) => (
              <a key={i} href="#" className="w-12 h-12 bg-[#FFF] rotate-45 flex items-center justify-center text-black hover:bg-white hover:text-[#D9B44A] transition-all transform hover:scale-110 shadow-lg">
                <div className="-rotate-45">{icon}</div>
              </a>
            ))}
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 text-center">
            <p className="text-3xl font-serif italic opacity-30 tracking-widest uppercase">&copy; {new Date().getFullYear()} Rua’s Bakery. </p>
          </div>
        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        updateQuantity={updateCartQuantity}
        removeItem={removeFromCart}
        customer={customer}
        onOpenAuth={() => { setIsCartOpen(false); setIsAuthOpen(true); }}
      />
      <CustomerAuth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onAuthSuccess={handleCustomerAuthSuccess} />
      <ProductDetailsModal isOpen={isDetailsOpen} product={selectedProduct} onClose={() => setIsDetailsOpen(false)} />
    </div>
  );
};

export default App;
