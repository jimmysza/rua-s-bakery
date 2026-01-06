
import React, { useState, useMemo, useEffect } from 'react';
import { X, Minus, Plus, Trash2, Send, ShoppingBasket, Truck, Home, UserCheck, AlertCircle } from 'lucide-react';
import { CartItem, CustomerUser } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  customer: CustomerUser | null;
  onOpenAuth: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, updateQuantity, removeItem, customer, onOpenAuth }) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');

  // Bloquear scroll del body cuando el carrito está abierto
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

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0), [items]);
  const total = subtotal;

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;
    if (!customer) {
      onOpenAuth();
      return;
    }

    let message = `¡Hola Rua’s Bakery! Me gustaría hacer un pedido:\n\n`;
    message += `*Cliente:* ${customer.name}\n`;
    message += `*Teléfono:* ${customer.phone}\n`;
    message += `*Método:* ${deliveryMethod === 'pickup' ? 'Recoger en tienda' : 'Domicilio'}\n`;
    
    if (deliveryMethod === 'delivery') {
      message += `*Dirección:* ${customer.address}\n`;
    }
    
    message += `\n*Productos:*\n`;
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.product.name} ($${(item.product.price * item.quantity).toFixed(2)})\n`;
    });
    
    message += `\n*Total:* $${total.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform animate-slide-in">
          <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between bg-primary-light">
            <h2 className="text-2xl font-bold font-serif text-gray-800">Tu Pedido</h2>
            <button onClick={onClose} className="p-2 hover:bg-primary/10 rounded-full transition-colors">
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 scrollbar-hide">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <ShoppingBasket className="h-16 w-16 text-gray-200 mb-4" />
                <p className="text-gray-500 font-medium italic">Tu cesta está vacía...</p>
              </div>
            ) : (
              <>
                {items.map((item) => {
                  const isAtMaxStock = item.quantity >= item.product.stock;
                  return (
                    <div key={item.product.id} className="flex space-x-4 pb-4 border-b border-gray-50 last:border-0">
                      <img 
                        src={item.product.images?.[0]} 
                        alt={item.product.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-gray-800 text-sm">{item.product.name}</h4>
                            {isAtMaxStock && (
                              <p className="text-[10px] text-orange-500 font-bold flex items-center mt-0.5">
                                <AlertCircle className="h-3 w-3 mr-1" /> Límite de stock ({item.product.stock})
                              </p>
                            )}
                          </div>
                          <p className="text-primary font-bold text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-200 rounded-lg scale-90 -ml-2">
                            <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 hover:bg-gray-50"><Minus className="h-4 w-4" /></button>
                            <span className="px-3 text-xs font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, 1)} 
                              disabled={isAtMaxStock}
                              className={`p-1 hover:bg-gray-50 transition-colors ${isAtMaxStock ? 'opacity-20 cursor-not-allowed' : ''}`}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.product.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="pt-4 space-y-4">
                  <h4 className="font-bold text-gray-800 text-sm uppercase tracking-widest">Opción de entrega</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeliveryMethod('pickup')}
                      className={`flex-1 flex items-center justify-center p-3 rounded-2xl border-2 transition-all ${deliveryMethod === 'pickup' ? 'border-primary bg-primary-light text-primary' : 'border-gray-100 text-gray-400'}`}
                    >
                      <Home className="h-4 w-4 mr-2" />
                      <span className="text-xs font-bold">Recoger</span>
                    </button>
                    <button
                      onClick={() => setDeliveryMethod('delivery')}
                      className={`flex-1 flex items-center justify-center p-3 rounded-2xl border-2 transition-all ${deliveryMethod === 'delivery' ? 'border-primary bg-primary-light text-primary' : 'border-gray-100 text-gray-400'}`}
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      <span className="text-xs font-bold">Domicilio</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="p-6 bg-white border-t border-gray-100 space-y-4 shadow-lg">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-2">
                <span>Total del Pedido</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            {!customer ? (
              <button 
                onClick={onOpenAuth}
                className="w-full flex items-center justify-center py-4 bg-accent text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl"
              >
                <UserCheck className="h-5 w-5 mr-2" />
                Inicia sesión para comprar
              </button>
            ) : (
              <button 
                disabled={items.length === 0}
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center py-4 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 transition-all shadow-xl disabled:opacity-50 group"
              >
                <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Enviar Pedido WhatsApp
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
