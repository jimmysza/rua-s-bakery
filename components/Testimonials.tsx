
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "María García",
    role: "Cliente Frecuente",
    quote: "El pastel de Red Velvet fue la estrella de mi cumpleaños. La textura es increíble y el frosting de queso es el mejor que he probado jamás. ¡Simplemente delicioso!",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    stars: 5
  },
  {
    name: "Carlos Ruiz",
    role: "Amante del Dulce",
    quote: "Los macarons son auténticos, me recordaron a mi viaje a París. La crujencia exterior y el relleno cremoso son perfección pura. Se nota la calidad de los ingredientes.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    stars: 5
  },
  {
    name: "Ana Martínez",
    role: "Organizadora de Eventos",
    quote: "Excelente servicio y la tarta de frutos rojos es espectacular. Mis invitados quedaron encantados con la presentación y el sabor fresco de las bayas.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    stars: 5
  },
  {
    name: "Jorge López",
    role: "Cliente Local",
    quote: "La atención personalizada y el aroma que desprende la tienda es solo el inicio. Cada bocado cuenta una historia de dedicación. ¡Mi pastelería favorita!",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    stars: 5
  }
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section className="py-20 bg-pink-50/30 rounded-[3rem] mb-16 border border-pink-100 overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-white rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-pink-100">
            Opiniones Reales
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-500 italic mt-4 text-lg">Historias dulces compartidas por nuestra familia de clientes.</p>
        </div>

        <div className="relative">
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
            <div className="relative">
              <div className="absolute -top-6 -left-6 text-pink-200">
                <Quote className="h-16 w-16 fill-current opacity-50" />
              </div>
              <img 
                src={testimonials[current].photo} 
                alt={testimonials[current].name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl relative z-10"
              />
            </div>

            <div className="flex space-x-1">
              {[...Array(testimonials[current].stars)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="text-xl md:text-2xl text-gray-700 italic font-serif leading-relaxed max-w-2xl">
              "{testimonials[current].quote}"
            </p>

            <div>
              <h4 className="text-xl font-bold text-gray-800">{testimonials[current].name}</h4>
              <p className="text-primary font-medium text-sm uppercase tracking-widest mt-1">{testimonials[current].role}</p>
            </div>
          </div>

          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 md:-px-12 pointer-events-none">
            <button 
              onClick={prev} 
              className="p-4 rounded-full bg-white text-gray-400 hover:text-primary transition-all shadow-lg hover:scale-110 pointer-events-auto"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={next} 
              className="p-4 rounded-full bg-white text-gray-400 hover:text-primary transition-all shadow-lg hover:scale-110 pointer-events-auto"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-3 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 transition-all duration-300 rounded-full ${idx === current ? 'w-8 bg-primary' : 'w-2 bg-pink-200'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
