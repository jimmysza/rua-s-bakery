
import { ArrowLeft, ArrowRight, Cake, Lock, ShieldCheck, User } from 'lucide-react';
import React, { useState } from 'react';
import { supabase } from '../src/lib/supabase';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // ...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const admins = ['nathalievalencia@uninorte.edu.co'];

    if (!admins.includes(data.user?.email || '')) {
      setError('Acceso denegado: No tienes permisos de administrador.');
      await supabase.auth.signOut();
    } else {
      onLogin();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col md:flex-row animate-fade-in overflow-hidden">
      {/* Left Decoration Panel (Desktop only) */}
      <div className="hidden md:flex md:w-1/2 relative h-full bg-gray-900 items-center justify-center p-20 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200"
            alt="Bakery Kitchen"
            className="w-full h-full object-cover opacity-20 grayscale"
          />
        </div>
        <div className="relative z-10 text-center space-y-8 max-w-md">
          <div className="inline-flex p-5 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 mb-4">
            <ShieldCheck className="h-12 w-12 text-pink-400" />
          </div>
          <h2 className="text-5xl font-bold font-serif leading-tight">
            Panel de <span className="text-pink-400 italic">Gestión</span>.
          </h2>
          <p className="text-lg text-gray-400 italic leading-relaxed">
            "Control total sobre el catálogo, stock y visibilidad de tus creaciones artesanales."
          </p>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 md:top-8 md:left-8 z-[110] flex items-center space-x-2 px-4 py-2 bg-gray-50/80 backdrop-blur-sm hover:bg-pink-50 text-gray-500 hover:text-pink-500 rounded-full transition-all border border-gray-100 shadow-sm font-bold text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Volver a la tienda</span>
      </button>

      {/* Login Panel */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto scrollbar-hide px-6 py-12 md:px-20 md:py-24 justify-center bg-white">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center space-x-3 mb-10 md:hidden">
            <Cake className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold font-serif text-gray-800">Rua’s Bakery</span>
          </div>

          <div className="mb-10">
            <span className="text-pink-500 font-bold text-xs uppercase tracking-widest block mb-2">Acceso Administrativo</span>
            <h1 className="text-4xl font-bold font-serif text-gray-900 mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-gray-400 italic text-sm">
              Ingresa tus credenciales de seguridad para acceder al panel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-tighter ml-1">Correo de Administrador</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                <input
                  type="email"
                  autoComplete="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-sm transition-all font-medium text-gray-900"
                  placeholder="admin@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-tighter ml-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-sm transition-all font-medium text-gray-900"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-xs font-bold border border-red-100 flex items-center animate-pulse">
                <ShieldCheck className="h-4 w-4 mr-2" /> {error}
              </div>
            )}

            <button
              type="submit"
              className="group w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-bold hover:bg-pink-600 transition-all shadow-xl shadow-gray-200 flex items-center justify-center space-x-2 overflow-hidden"
            >
              <span>Acceder al Dashboard</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform text-pink-400" />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-center space-x-3 text-gray-300">
            <Lock className="h-4 w-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Conexión Segura Encriptada</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
