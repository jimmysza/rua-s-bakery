
import { supabase } from '@/services/supabaseClient';
import { ArrowRight, Cake, Loader2, Lock, MapPin, Phone, User, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { AddressSuggestion, searchAddresses } from '../services/geminiService';
import { CustomerUser } from '../types';

interface CustomerAuthProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: CustomerUser) => void;
}

const CustomerAuth: React.FC<CustomerAuthProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef<any>(null);

  // Bloquear scroll del body cuando el panel de auth está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (formData.address.length > 5 && !isLogin && showSuggestions) {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

      searchTimeoutRef.current = setTimeout(async () => {
        setIsSearching(true);
        const results = await searchAddresses(formData.address);
        setAddressSuggestions(results);
        setIsSearching(false);
      }, 800);
    } else {
      setAddressSuggestions([]);
    }
    return () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current); };
  }, [formData.address, isLogin, showSuggestions]);

  if (!isOpen) return null;

  // ... imports remain the same

  // Inside component
  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.username, // Using username field as email
        password: formData.password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        // Create a customer user object or fetch profile
        const metadata = data.user.user_metadata || {};
        const user: CustomerUser = {
          id: data.user.id,
          name: metadata.name || data.user.email?.split('@')[0] || 'User',
          phone: metadata.phone || '',
          address: metadata.address || '',
          username: data.user.email || '',
          lat: 0, lng: 0
        };
        onAuthSuccess(user);
        onClose();
      }
    } else {
      // Sign Up
      const { data, error } = await supabase.auth.signUp({
        email: formData.username,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
            address: formData.address
          }
        }
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        const user: CustomerUser = {
          id: data.user.id,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          username: formData.username,
          lat: 11.0041, lng: -74.8070 // Default
        };
        onAuthSuccess(user);
        onClose();
      }
    }
  };

  const selectSuggestion = (s: AddressSuggestion) => {
    setFormData({ ...formData, address: s.address });
    setShowSuggestions(false);
    setAddressSuggestions([]);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col md:flex-row animate-fade-in overflow-hidden">
      {/* Left Decoration Panel (Desktop only) */}
      <div className="hidden md:flex md:w-1/2 relative h-full bg-pink-50 items-center justify-center p-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&q=80&w=1200"
            alt="Bakery Aesthetic"
            className="w-full h-full object-cover opacity-30 grayscale"
          />
        </div>
        <div className="relative z-10 text-center space-y-8 max-w-md">
          <div className="inline-flex p-4 bg-white rounded-3xl shadow-xl shadow-pink-100/50 mb-4 animate-bounce">
            <Cake className="h-12 w-12 text-pink-500" />
          </div>
          <h2 className="text-6xl font-bold font-serif text-gray-800 leading-tight">
            Momentos <span className="text-pink-500 italic">dulces</span> para ti.
          </h2>
          <p className="text-xl text-gray-500 italic">
            "Donde el aroma del pan recién horneado cuenta una historia de tradición y amor."
          </p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-[110] p-4 bg-gray-50/80 backdrop-blur-sm hover:bg-pink-50 text-gray-400 hover:text-pink-500 rounded-full transition-all border border-gray-100 shadow-sm"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Auth Panel */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto scrollbar-hide px-6 py-12 md:px-20 md:py-24 justify-center bg-white">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center space-x-3 mb-10 md:hidden">
            <div className="p-2 bg-pink-50 rounded-xl">
              <Cake className="h-8 w-8 text-pink-500" />
            </div>
            <span className="text-2xl font-bold font-serif text-gray-800">Rua’s Bakery</span>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold font-serif text-gray-900 mb-2">
              {isLogin ? '¡Bienvenido!' : 'Únete a nosotros'}
            </h1>
            <p className="text-gray-400 italic text-sm">
              {isLogin ? 'Ingresa tus credenciales para continuar.' : 'Completa tus datos para disfrutar de nuestra repostería.'}
            </p>
          </div>

          <form onSubmit={handleAction} className="space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                  <input
                    type="text"
                    placeholder="Nombre"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-sm transition-all text-gray-900"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-sm transition-all text-gray-900"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="relative col-span-1 md:col-span-2">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                  <input
                    type="text"
                    placeholder="Dirección"
                    required
                    autoComplete="off"
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-sm transition-all text-gray-900"
                    value={formData.address}
                    onFocus={() => setShowSuggestions(true)}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  {isSearching && (
                    <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-400 animate-spin" />
                  )}
                  {showSuggestions && addressSuggestions.length > 0 && (
                    <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto scrollbar-hide">
                      {addressSuggestions.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectSuggestion(s)}
                          className="w-full text-left px-5 py-3 hover:bg-pink-50 text-sm text-gray-600 border-b border-gray-50 last:border-0 flex items-center group transition-colors"
                        >
                          <MapPin className="h-4 w-4 mr-3 text-gray-300 group-hover:text-pink-400" />
                          <span className="truncate">{s.address}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
              <input
                type="text"
                placeholder="Usuario"
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-sm transition-all text-gray-900"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
              <input
                type="password"
                placeholder="Contraseña"
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-sm transition-all text-gray-900"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-xs font-bold border border-red-100 flex items-center">
                <X className="h-4 w-4 mr-2" /> {error}
              </div>
            )}

            <button
              type="submit"
              className="group w-full py-5 bg-pink-500 text-white rounded-[1.5rem] font-bold hover:bg-pink-600 transition-all shadow-xl shadow-pink-100 flex items-center justify-center space-x-2"
            >
              <span>{isLogin ? 'Iniciar Sesión' : 'Registrarme'}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm mb-4">
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            </p>
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="px-8 py-3 bg-pink-50 text-pink-500 rounded-full font-bold text-sm hover:bg-pink-100 transition-all"
            >
              {isLogin ? 'Crear una ahora' : 'Ingresar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAuth;
