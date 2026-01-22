
import React from 'react';

const testimonials = [
  {
    text: "En solo 15 minutos recibí una propuesta personalizada para mi boda que superó todo lo que había buscado en 3 días. Sabor y presentación de otro nivel.",
    name: "Dmitry",
    role: "Arquitecto",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
  },
  {
    text: "Buscaba algo diferente y Rua's Bakery me sorprendió con sabores que no se mencionan en las guías tradicionales. Me sentí como un local en París.",
    name: "Igor",
    role: "Fundador",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
  },
  {
    text: "Entramos en el mundo de los postres de autor y evitamos lo común. A mis hijos les encantaron las historias interactivas detrás de cada bandeja.",
    name: "Jane",
    role: "Tutora",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
  },
  {
    text: "Gracias a Valerie descubrí una terraza secreta de sabores. Se siente como una repostería Romana, no una turística. Autenticidad pura.",
    name: "Nicolas",
    role: "Periodista",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
  },
  {
    text: "No sabía que la repostería podía ser tan emocionante. Cada entrega es una sorpresa artística que no encuentras en ningún otro lugar del país.",
    name: "Eva",
    role: "Música",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
  }
];

const HorizontalTestimonials: React.FC = () => {
  return (
    <section className="py-32 bg-[#fdfdfd] overflow-hidden border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-5xl md:text-7xl font-bold font-serif text-gray-900 leading-tight">
          Nuestros clientes ya están <br /> <span className="text-gray-400">disfrutando una nueva experiencia</span>
        </h2>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-12 px-6 scrollbar-hide">
        {testimonials.map((t, i) => (
          <div key={i} className="min-w-[320px] md:min-w-[380px] bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col justify-between hover:translate-y-[-10px] transition-transform duration-300">
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              "{t.text}"
            </p>
            <div className="flex items-center">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover mr-4" />
              <div>
                <h4 className="font-bold text-gray-900 leading-none">{t.name}</h4>
                <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalTestimonials;


