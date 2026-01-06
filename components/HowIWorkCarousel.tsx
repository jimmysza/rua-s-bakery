
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Leaf, Waves, ThermometerSun, Sparkles } from 'lucide-react';

const steps = [
  {
    title: "Selección Premium",
    desc: "Elegimos solo ingredientes locales y orgánicos de la más alta calidad.",
    icon: <Leaf className="h-8 w-8 text-green-500" />,
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Amasado Artesanal",
    desc: "Nuestros procesos de amasado son lentos para desarrollar sabores profundos.",
    icon: <Waves className="h-8 w-8 text-blue-400" />,
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Horneado Controlado",
    desc: "Cada pieza se hornea individualmente con precisión milimétrica.",
    icon: <ThermometerSun className="h-8 w-8 text-orange-400" />,
    img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Decoración a Mano",
    desc: "El toque final es una obra de arte creada especialmente para ti.",
    icon: <Sparkles className="h-8 w-8 text-pink-400" />,
    img: "https://images.unsplash.com/photo-1464305795204-6f5bdee7327a?auto=format&fit=crop&q=80&w=800"
  }
];

const HowIWorkCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % steps.length);
  const prev = () => setCurrent((prev) => (prev === 0 ? steps.length - 1 : prev - 1));

  return (
    <div className="py-16 bg-white rounded-[3rem] shadow-sm border border-pink-50 overflow-hidden relative mb-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-gray-800">Nuestro Proceso</h2>
          <p className="text-gray-500 italic mt-2">Amor y paciencia en cada creación</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 min-h-[400px]">
          <div className="w-full md:w-1/2 relative group">
            <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src={steps[current].img} 
                alt={steps[current].title}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 transform scale-105 group-hover:scale-100"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-pink-500 p-6 rounded-3xl shadow-xl text-white">
              {steps[current].icon}
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
            <div className="flex items-center space-x-4">
              <span className="text-6xl font-black text-pink-100 font-serif">0{current + 1}</span>
              <h3 className="text-3xl font-bold text-gray-800">{steps[current].title}</h3>
            </div>
            <p className="text-xl text-gray-500 italic leading-relaxed">
              "{steps[current].desc}"
            </p>
            <div className="flex space-x-4 pt-8">
              <button onClick={prev} className="p-4 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button onClick={next} className="p-4 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex space-x-2 pt-4">
              {steps.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 transition-all duration-300 rounded-full ${idx === current ? 'w-12 bg-pink-500' : 'w-4 bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowIWorkCarousel;
