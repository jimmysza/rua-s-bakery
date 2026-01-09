
import { ChefHat, ChevronLeft, ChevronRight, Info, Package, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, isOpen, onClose }) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Bloquear scroll del body cuando el modal está abierto
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

  if (!isOpen || !product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800'];

  const nextImg = () => setActiveImgIndex((prev) => (prev + 1) % images.length);
  const prevImg = () => setActiveImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center md:p-4 overflow-hidden">
      {/* Overlay - visible only on desktop to allow clicking outside */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md hidden md:block" onClick={onClose} />

      <div className="relative bg-white w-full h-full md:h-auto md:max-w-2xl md:max-h-[90vh] md:rounded-3xl shadow-2xl overflow-y-auto transform transition-all animate-fade-in flex flex-col scrollbar-hide">
        {/* Gallery Header */}
        <div className="relative h-96 md:h-[28rem] w-full bg-gray-100 flex-shrink-0">
          <img
            src={images[activeImgIndex]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-all shadow-lg active:scale-90"
            aria-label="Cerrar detalles"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/30 hover:bg-white/60 backdrop-blur-md rounded-full text-white transition-all shadow-lg"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/30 hover:bg-white/60 backdrop-blur-md rounded-full text-white transition-all shadow-lg"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-white via-white/60 to-transparent">
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-gray-800 leading-tight">{product.name}</h3>
          </div>
        </div>

        {/* Thumbnail bar */}
        {images.length > 1 && (
          <div className="flex px-6 md:px-8 py-3 bg-white space-x-3 overflow-x-auto scrollbar-hide border-b border-gray-50 flex-shrink-0">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImgIndex(idx)}
                className={`h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${idx === activeImgIndex ? 'border-primary scale-105 shadow-md' : 'border-transparent opacity-60'
                  }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt={`Thumb ${idx}`}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 md:p-8 space-y-8 pb-10 md:pb-8">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-primary-light rounded-2xl flex-shrink-0">
              <ChefHat className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Preparación</h4>
              <p className="text-gray-600 leading-relaxed italic text-sm md:text-base">
                {product.preparation || "Elaborado con técnicas tradicionales francesas y un toque de inspiración moderna."}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-primary-light rounded-2xl flex-shrink-0">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ingredientes & Materiales</h4>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {product.materials || "Ingredientes 100% naturales, sin conservantes ni aditivos artificiales."}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center text-gray-500 text-sm font-medium">
              <Info className="h-4 w-4 mr-2 text-primary" />
              <span>Stock disponible:</span>
            </div>
            <span className={`font-bold text-sm md:text-base ${product.stock > 0 ? 'text-green-600' : 'text-orange-500'}`}>
              {product.stock > 0 ? `${product.stock} unidades` : 'Para Ordenar (Sobre Pedido)'}
            </span>
          </div>

          <div className="md:hidden pt-8 text-center">
            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">— Fin de la información —</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
