
import React from 'react';
import { ShoppingCart, Cake, LogOut, LayoutDashboard, UserCircle, MessageSquare, User } from 'lucide-react';
import { View, CustomerUser } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  cartCount: number;
  onOpenCart: () => void;
  isAdmin: boolean;
  customer: CustomerUser | null;
  onLogout: () => void;
  onOpenAuth: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  setView, 
  cartCount, 
  onOpenCart, 
  isAdmin,
  customer,
  onLogout,
  onOpenAuth
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => setView('shop')}
          >
            <div className="">
              
              <img  className="h-15 w-16 rounded-full" src="logo.jpg" alt="" />
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-6">
            <button 
              onClick={() => setView('contact')}
              className={`flex items-center px-3 py-2 rounded-xl transition-all ${currentView === 'contact' ? 'bg-primary-light text-primary font-bold' : 'text-gray-500 hover:text-primary'}`}
            >
              <MessageSquare className="h-5 w-5 mr-1" />
              <span className="hidden md:inline text-sm font-medium">Contacto</span>
            </button>

            {isAdmin && (
              <button 
                onClick={() => setView('admin')}
                className={`flex items-center px-3 py-2 rounded-xl transition-all ${currentView === 'admin' ? 'bg-primary-light text-primary font-bold' : 'text-gray-500 hover:text-primary'}`}
              >
                <LayoutDashboard className="h-5 w-5 mr-1" />
                <span className="hidden md:inline text-sm font-medium">Dashboard</span>
              </button>
            )}

            <button 
              onClick={onOpenCart}
              className="relative p-3 text-gray-600 hover:bg-primary-light hover:text-primary rounded-2xl transition-all"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="h-8 w-[1px] bg-gray-100 hidden sm:block"></div>

            {customer ? (
              <div className="flex items-center space-x-2 md:space-x-3">
                <button 
                  onClick={() => setView('profile')}
                  className={`flex items-center px-3 py-2 rounded-xl transition-all ${currentView === 'profile' ? 'bg-primary-light text-primary' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  <User className="h-5 w-5 md:mr-2" />
                  <div className="hidden md:block text-left">
                    <p className="text-[10px] font-bold text-gray-800 line-clamp-1 leading-tight">{customer.name.split(' ')[0]}</p>
                    <p className="text-[9px] text-primary font-medium italic leading-tight">Mi Perfil</p>
                  </div>
                </button>
                <button 
                  onClick={onLogout}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Cerrar Sesión"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              !isAdmin && (
                <button 
                  onClick={onOpenAuth}
                  className="flex items-center px-5 py-2.5 bg-accent text-white rounded-2xl hover:bg-primary transition-all shadow-md font-bold text-sm"
                >
                  <UserCircle className="h-4 w-4 mr-2" />
                  Ingresar
                </button>
              )
            )}

            {isAdmin && (
               <button 
                onClick={onLogout}
                className="p-2.5 bg-gray-100 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Cerrar Admin"
              >
                <LogOut className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
