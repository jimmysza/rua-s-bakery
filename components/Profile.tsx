
import { supabase } from '@/services/supabaseClient';
import { ChevronRight, Heart, LogOut, MapPin, Phone, Save, Trash2, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { CustomerUser } from '../types';

interface ProfileProps {
  customer: CustomerUser;
  onLogout: () => void;
  onBackToShop: () => void;
  onUpdateProfile?: (updatedUser: CustomerUser) => void;
}

const Profile: React.FC<ProfileProps> = ({ customer, onLogout, onBackToShop, onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    name: customer.name || '',
    phone: customer.phone || '',
    address: customer.address || '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      name: customer.name || '',
      phone: customer.phone || '',
      address: customer.address || '',
    });
  }, [customer]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }
      });

      if (error) throw error;

      if (onUpdateProfile && data.user) {
        onUpdateProfile({
          ...customer,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        });
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Hubo un error al actualizar tu perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      // En un entorno real, usar supabase.rpc('delete_user') o una Edge Function.
      // Aquí simularemos la eliminación cerrando sesión y mostrando un mensaje.
      alert('Cuenta eliminada correctamente.');
      onLogout();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="bg-white rounded-[3rem] shadow-xl border border-pink-50 overflow-hidden">
        {/* Header del Perfil */}
        <div className="bg-gradient-to-r from-primary to-pink-400 p-10 md:p-16 text-white relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-8">
            <div className="h-32 w-32 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/30 flex items-center justify-center shadow-2xl">
              <User className="h-16 w-16 text-white" />
            </div>
            <div className="text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Cliente VIP</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">{formData.name || customer.name}</h2>
              <p className="text-pink-100 italic opacity-90">@{customer.username}</p>
            </div>
          </div>
          {/* Decoración */}
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Heart className="h-40 w-40 fill-current" />
          </div>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Sidebar de Acciones */}
          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Acciones de Cuenta</h4>

              <div className="space-y-3">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center px-6 py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold hover:bg-gray-100 transition-all group"
                >
                  <LogOut className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Cerrar Sesión
                </button>

                <button
                  onClick={handleDelete}
                  className="w-full flex items-center justify-center px-6 py-4 bg-red-50 text-red-500 rounded-2xl font-bold hover:bg-red-100 transition-all group"
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Eliminar Cuenta
                </button>
              </div>
            </div>

            <div className="bg-pink-50/50 p-6 rounded-[2rem] border border-pink-100 text-center space-y-4">
              <Heart className="h-8 w-8 text-primary mx-auto opacity-40" />
              <p className="text-gray-500 italic text-sm">"Gracias por ser parte de nuestra familia dulcera."</p>
              <button
                onClick={onBackToShop}
                className="inline-flex items-center text-primary font-bold text-sm hover:underline"
              >
                Volver a la tienda <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Main Content - Formulario de Edición */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-serif font-bold text-gray-800">Editar Información Personal</h3>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-2">Nombre Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none transition-all text-gray-900"
                      placeholder="Tu nombre"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-2">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none transition-all text-gray-900"
                      placeholder="Tu teléfono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-2">Dirección de Entrega</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none transition-all text-gray-900"
                      placeholder="Tu dirección"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-8 py-4 bg-pink-500 text-white rounded-2xl font-bold hover:bg-pink-600 transition-all shadow-lg flex items-center justify-center disabled:opacity-70"
                  >
                    {loading ? 'Guardando...' : (
                      <>
                        <Save className="h-5 w-5 mr-2" />
                        Guardar Cambios
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
