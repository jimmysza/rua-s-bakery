
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: "¿Con cuánto tiempo de anticipación debo hacer mi pedido?",
    a: "Para productos del catálogo regular, 24 horas. Para eventos personalizados o bodas, recomendamos al menos 15 días de antelación."
  },
  {
    q: "¿Realizan entregas a domicilio en todo Barranquilla?",
    a: "Sí, cubrimos Barranquilla, Puerto Colombia y Soledad. El costo del domicilio varía según la zona (Gratis en Ciudad Mallorquín)."
  },
  {
    q: "¿Tienen opciones sin azúcar o sin gluten?",
    a: "Contamos con una línea 'Wellness' especializada en postres sin azúcar refinada y opciones amigables para celíacos bajo pedido previo."
  },
  {
    q: "¿Cómo puedo personalizar mi pastel?",
    a: "Puedes enviarnos una referencia por WhatsApp o agendar una cita en nuestro local para diseñar juntos la estructura, sabores y decoración."
  }
];

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full py-24 bg-white  mx-auto px-6">
      <div className="text-center mb-16">
        <HelpCircle className="h-10 w-10 text-primary mx-auto mb-4" />
        <h2 className="text-4xl font-serif font-bold text-gray-900">Dudas Frecuentes</h2>
        <p className="text-gray-500 italic mt-2">Todo lo que necesitas saber sobre Rua's Bakery</p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-100 rounded-3xl overflow-hidden transition-all">
            <button 
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-7 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-bold text-gray-800 pr-4">{faq.q}</span>
              {open === i ? <Minus className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-gray-300" />}
            </button>
            {open === i && (
              <div className="p-7 pt-0 text-gray-500 leading-relaxed animate-fade-in">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
