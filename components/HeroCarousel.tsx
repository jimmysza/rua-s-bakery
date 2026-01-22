
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ShoppingBag } from 'lucide-react';

const slides = [
  {
    title: "Sabor que Enamora",
    subtitle: "Artesanía que se derrite en tu boca, horneada cada mañana con pasión.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1600",
    tag: "Favorito de la Casa"
  },
  {
    title: "Momentos Especiales",
    subtitle: "El detalle perfecto para celebrar la vida. Personalizamos tus sueños en azúcar.",
    image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80&w=1600",
    tag: "Edición Limitada"
  },
  {
    title: "Calidad Gourmet",
    subtitle: "Ingredientes premium seleccionados para ofrecerte una experiencia inigualable.",
    image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&q=80&w=1600",
    tag: "100% Artesanal"
  }
];

const HeroCarousel: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative h-[85vh] w-full overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover brightness-[0.45] scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div className={`max-w-4xl transform transition-all duration-1000 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/30 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-8">
                <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
                {slide.tag}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-8 leading-tight">
                {slide.title}
              </h1>
              <p className="text-2xl md:text-2xl text-gray-100 mb-12 italic font-light max-w-2xl mx-auto leading-relaxed">
                "{slide.subtitle}"
              </p>
              <button 
                onClick={onExplore}
                className="inline-flex items-center px-12 py-5 bg-primary text-white rounded-full font-bold hover:bg-white hover:text-primary transition-all transform hover:scale-105 shadow-2xl"
              >
                <ShoppingBag className="h-5 w-5 mr-3" />
                Explorar Colección
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button onClick={prev} className="absolute left-8 top-1/2 -translate-y-1/2 p-5 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white rounded-full transition-all opacity-0 group-hover:opacity-100 border border-white/10">
        <ChevronLeft className="h-7 w-7" />
      </button>
      <button onClick={next} className="absolute right-8 top-1/2 -translate-y-1/2 p-5 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white rounded-full transition-all opacity-0 group-hover:opacity-100 border border-white/10">
        <ChevronRight className="h-7 w-7" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1 transition-all duration-500 rounded-full ${
              idx === current ? 'w-16 bg-white' : 'w-6 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
