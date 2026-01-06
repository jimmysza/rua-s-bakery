
import React from 'react';
import { Plus, Info, ShoppingBasket } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onShowDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onShowDetails }) => {
  const isOutOfStock = product.stock <= 0;
  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full relative">
      {isOutOfStock && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter shadow-md">
            Agotado
          </span>
        </div>
      )}

      <div className="relative overflow-hidden h-56">
        <img
          src={mainImage}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ${isOutOfStock ? 'grayscale opacity-75' : ''}`}
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-primary font-bold px-3 py-1 rounded-full shadow-sm text-sm">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          {!isOutOfStock && (
            <button
              onClick={() => onAddToCart(product)}
              className="bg-white text-primary p-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            >
              <ShoppingBasket className="h-6 w-6" />
            </button>
          )}
          <button
            onClick={() => onShowDetails(product)}
            className="bg-primary text-white p-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
          >
            <Info className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest">
            {product.category}
          </div>
          <span className={`text-[10px] font-bold ${product.stock > 5 ? 'text-gray-400' : 'text-orange-500'}`}>
            {product.stock} disp.
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-2 italic">
          "{product.description}"
        </p>

        <div className="flex space-x-2">
          <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={`flex-grow flex items-center justify-center py-3 font-semibold rounded-xl transition-all duration-300 border ${isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100'
                : 'bg-primary-light text-primary hover:bg-primary hover:text-white border-primary-light shadow-sm'
              }`}
          >
            {isOutOfStock ? 'Agotado' : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </>
            )}
          </button>
          <button
            onClick={() => onShowDetails(product)}
            className="px-4 py-3 bg-gray-50 text-gray-400 hover:bg-primary-light hover:text-primary rounded-xl transition-all"
            title="Ver detalles"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
