
import { AlertTriangle, ArrowRight, Cake, CheckCircle2, Layers, Search, Sparkles } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import AdminLogin from '../components/AdminLogin';
import Cart from '../components/Cart';
import Contact from '../components/Contact';
import CustomerAuth from '../components/CustomerAuth';
import HowIWorkCarousel from '../components/HowIWorkCarousel';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductDetailsModal from '../components/ProductDetailsModal';
import Profile from '../components/Profile';
import Testimonials from '../components/Testimonials';
/* import { supabase } from '@/services/supabaseClient'; */ // This comment is already there, I should use the real import.
import { CartItem, CustomerUser, Product, View } from '../lib/types';
import { supabase } from './lib/supabase';

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

    if (product.stock <= 0 || currentQty >= product.stock) {
      setToastMessage({ type: 'error', text: 'Stock insuficiente' });
      setShowAddedToast(true);
      setTimeout(() => setShowAddedToast(false), 2000);
      return;
    }

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
        const validatedQty = Math.max(1, Math.min(newQty, item.product.stock));
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
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] ${toastMessage.type === 'error' ? 'bg-red-600' : 'bg-accent'} text-white px-6 py-4 rounded-[2rem] flex items-center shadow-2xl backdrop-blur-md animate-bounce`}>
          {toastMessage.type === 'error' ? <AlertTriangle className="h-6 w-6 mr-3" /> : <CheckCircle2 className="h-6 w-6 text-green-400 mr-3" />}
          <span className="font-bold">{toastMessage.text}</span>
        </div>
      )}

      <main className="flex-grow" >

        {currentView === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="relative rounded-[3rem] overflow-hidden mb-16 h-[500px] flex items-center shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?auto=format&fit=crop&q=80&w=1200"
                alt="Hero"
                className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
              />
              <div className="relative z-10 px-8 md:px-20 max-w-2xl text-white text-center md:text-left">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/30 backdrop-blur-md text-xs font-bold mb-6 border border-primary/40 uppercase tracking-widest">
                  <Sparkles className="h-4 w-4 mr-2 text-yellow-300" />
                  Repostería de Autor
                </span>
                <h1 className="text-5xl md:text-8xl font-bold font-serif mb-6 leading-tight">
                  Rua’s <span className="text-primary-light italic underline decoration-primary-light/30 underline-offset-8">Bakery</span>.
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 italic leading-relaxed opacity-90">
                  Dulces momentos horneados con alma y los mejores ingredientes artesanales.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <button onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 bg-primary text-white rounded-[2rem] font-bold hover:bg-primary-dark transition-all transform hover:-translate-y-1 shadow-lg">
                    Ver Menú
                  </button>
                </div>
              </div>
            </div>

            <HowIWorkCarousel />


            <div id="catalog" className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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

        {currentView === 'contact' && <Contact />}
        {currentView === 'profile' && customer && <Profile customer={customer} onLogout={handleLogout} onBackToShop={() => setView('shop')} onUpdateProfile={handleCustomerUpdate} />}
        {currentView === 'login' && !isAdminLoggedIn && <AdminLogin onLogin={handleAdminLoginSuccess} onBack={() => setView('shop')} />}
        {currentView === 'admin' && isAdminLoggedIn && <AdminDashboard products={products} onAddProduct={addProduct} onUpdateProduct={updateProduct} onDeleteProduct={deleteProduct} />}
      </main>
      {currentView == "shop" && (<Testimonials />)}

      <footer className="bg-white border-t border-primary-light pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <Cake className="h-8 w-8 text-primary" />
                <span className="ml-3 text-3xl font-bold font-serif text-gray-800">Rua’s Bakery</span>
              </div>
              <p className="text-gray-500 max-w-sm italic text-sm mb-6">Artesanía en cada bocado, preparada con amor en Ciudad Mallorquín.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-6 uppercase text-xs tracking-[0.2em]">Navegación</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li>
                  <button
                    onClick={() => {
                      setView('shop');
                      setTimeout(() => {
                        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                      }, 0);
                    }}
                    className="hover:text-primary"
                  >
                    Tienda
                  </button>
                </li>
                <li><button onClick={() => { setView('contact'); window.scrollTo(0, 0); }} className="hover:text-primary">Contacto</button></li>
                {!isAdminLoggedIn && <li><button onClick={() => { setView('login'); window.scrollTo(0, 0); }} className="hover:text-primary transition-colors">Administración</button></li>}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-6 uppercase text-xs tracking-[0.2em]">Ubicación</h4>
              <p className="text-gray-500 italic text-sm">{STORE_LOCATION.address}</p>
              <p className="text-gray-500 italic text-sm mt-4" >+57 304 5852792</p>
              <p className="text-gray-500 italic text-sm mt-4">hola@ruasbakery.com</p>
            </div>
          </div>
          <div className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest pt-8 border-t border-gray-100">
            &copy; {new Date().getFullYear()} Rua’s Bakery.
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
