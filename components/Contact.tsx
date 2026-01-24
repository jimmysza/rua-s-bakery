
import { CheckCircle2, Heart, Instagram, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';

const STORE_LOCATION = {
  lat: 11.0041,
  lng: -74.8070,
  address: "📍| Barranquilla / Ciudad Mallorquin"
};

const WHATSAPP_NUMBER = '57 3045852792';


const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Consulta General',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct email body
    const emailBody = `Hola Rua's Bakery,\n\nSoy ${formData.name}.\n\n${formData.message}\n\nMis datos de contacto:\nEmail: ${formData.email}`;

    // Create mailto link
    const mailtoLink = `mailto:nathalievalencia@uninorte.edu.co?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="animate-fade-in pb-20">
      {/* Hero Contacto */}
      <div className="bg-primary-light/30 py-20 mb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-serif text-gray-800 mb-4">Contacto</h1>
          <p className="text-gray-500 italic text-lg max-w-2xl mx-auto">
            ¿Tienes un evento especial o una duda? Estamos aquí para endulzar tu día.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          {/* Perfil de la Chef */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <img
                src="natt.jpg"
                alt="Chef Natalia Valencia"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-10">
                <div className="text-white">
                  <p className="text-sm font-bold uppercase tracking-widest mb-1">Fundadora & Chef</p>
                  <h2 className="text-4xl font-serif font-bold">Natalia Valencia</h2>
                </div>
              </div>
            </div>
            {/* Elemento decorativo */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>

          {/* Biografía y Misión */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 text-primary font-bold text-sm uppercase tracking-[0.3em]">
              <Heart className="h-4 w-4 fill-current" />
              <span>Nuestra Historia</span>
            </div>
            <h3 className="text-4xl font-serif font-bold text-gray-800 leading-tight">
              Pasión por la <span className="text-primary italic">excelencia</span> artesanal.
            </h3>
            <div className="space-y-6 text-gray-600 leading-relaxed italic text-lg">
              <p>
                "Mi viaje en la repostería comenzó en la cocina de mi abuela en Cartagena, donde aprendí que el secreto de un buen pastel no está solo en la técnica, sino en el alma que le pones a cada mezcla."
              </p>
              <p className="not-italic text-base">
                Tras años de formación en alta pastelería internacional, Natalia regresó a su ciudad natal para fundar <strong>Rua’s Bakery</strong>. Su visión es simple: transformar ingredientes nobles y locales en piezas de arte comestibles que celebren los momentos más importantes de la vida en Barranquilla.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-primary-light rounded-xl text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Ubicación</h4>
                  <p className="text-gray-500 text-xs mt-1">{STORE_LOCATION.address}</p>
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-4">
                <div className="p-3 bg-primary-light rounded-xl text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">WhatsApp</h4>
                  <p className="text-gray-500 text-xs mt-1">+{WHATSAPP_NUMBER}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="bg-white rounded-[4rem] shadow-2xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-2 bg-gray-900 p-12 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-serif font-bold mb-6">¿Hablamos?</h3>
              <p className="text-gray-400 mb-10 leading-relaxed">
                Para pedidos personalizados de bodas, eventos corporativos o clases magistrales, completa el formulario.
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-gray-300">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>nathalievalencia@uninorte.edu.co</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                  <Instagram className="h-5 w-5 text-primary" />
                  <span>@ruas.bakery</span>
                </div>
              </div>
            </div>
            <div className="pt-10 border-t border-gray-800 mt-10">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Horario de Atención</p>
              <p className="text-sm mt-2">Lunes a Sábado: 8:00 AM - 7:00 PM</p>
              <p className="text-sm">Domingos: 9:00 AM - 2:00 PM</p>
            </div>
          </div>

          <div className="md:col-span-3 p-12 relative">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                <div className="p-4 bg-green-50 rounded-full text-green-500">
                  <CheckCircle2 className="h-16 w-16" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">¡Mensaje Enviado!</h3>
                <p className="text-gray-500 italic">Te hemos redirigido a tu correo para finalizar el envío.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-primary font-bold underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Tu Nombre</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-light transition-all text-sm"
                      placeholder="Ej: Sofía Rojas"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Tu Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-light transition-all text-sm"
                      placeholder="sofia@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Asunto</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-light transition-all text-sm appearance-none"
                  >
                    <option>Consulta General</option>
                    <option>Pedido para Evento</option>
                    <option>Clases de Repostería</option>
                    <option>Quejas y Reclamos</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Mensaje</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-light transition-all text-sm min-h-[150px]"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-5 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-xl shadow-pink-100 flex items-center justify-center space-x-2 group"
                >
                  <span>Enviar Consulta (Email)</span>
                  <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
