
import { CheckCircle, Heart, Sparkles, Star } from 'lucide-react';
import React from 'react';

const CustomServices: React.FC = () => {
    return (
        <section className="bg-[#0f1012] py-24 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">

                {/* Lado Izquierdo: Composición de Imágenes (Estilo Daxus) */}
                <div className="relative w-full lg:w-1/2 h-[600px] flex items-center justify-center">
                    {/* Fondo decorativo de diamantes */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <div className="w-96 h-96 border-4 border-primary rotate-45 rounded-3xl"></div>
                        <div className="absolute w-80 h-80 border-2 border-primary rotate-12 rounded-3xl"></div>
                    </div>

                    {/* Imagen Central Destacada */}
                    <div className="relative z-10 w-72 h-[450px] rounded-[2rem] overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
                        <img
                            src="natt.jpg"
                            alt="Chef"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary/80 to-transparent">
                            <p className="text-white text-xs font-bold uppercase tracking-widest">Pastelera</p>
                            <h4 className="text-white font-serif text-xl">Natalie Valencia</h4>
                        </div>
                    </div>

                    {/* Imágenes Flotantes */}
                    <div className="absolute top-10 left-0 w-40 h-32 rounded-2xl overflow-hidden shadow-2xl -rotate-6 border border-white/10 hidden md:block">
                        <img src="customPostre.jpeg" className="w-full h-full object-cover" alt="Custom 1" />
                    </div>
                    <div className="absolute bottom-20 left-10 w-44 h-44 rounded-2xl overflow-hidden shadow-2xl rotate-12 border border-white/10 hidden md:block">
                        <img src="customPostre2.jpeg" className="w-full h-full object-cover" alt="Custom 2" />
                    </div>
                    <div className="absolute top-20 right-0 w-48 h-56 rounded-2xl overflow-hidden shadow-2xl -rotate-12 border border-white/10 hidden md:block">
                        <img src="custompostre3.jpeg" className="w-full h-full object-cover" alt="Custom 3" />
                    </div>
                    <div className="absolute bottom-10 right-10 w-40 h-32 rounded-2xl overflow-hidden shadow-2xl rotate-6 border border-white/10 hidden md:block">
                        <img src="customsBrownies.jpeg" className="w-full h-full object-cover" alt="Custom 4" />
                    </div>
                </div>

                {/* Lado Derecho: Contenido */}
                <div className="w-full lg:w-1/2 text-white space-y-8">
                    <div className="inline-flex items-center space-x-2 text-primary">
                        <Sparkles className="h-5 w-5 fill-current" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em]">Exclusividad Rua’s</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
                        Creamos <span className="text-primary italic">Productos</span> para tus celebraciones.
                    </h2>

                    <p className="text-gray-400 text-lg leading-relaxed">
                        Desde bandejas de desayuno personalizadas hasta majestuosos pasteles de boda. Cada pieza es diseñada exclusivamente para reflejar tu historia y emocionar a tus invitados.
                    </p>

                    <div className="space-y-6 pt-6">
                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary"><Star className="h-5 w-5" /></div>
                            <div>
                                <h4 className="font-bold text-xl">Eventos & Bodas</h4>
                                <p className="text-gray-500 text-sm">Mesas de postres temáticas y estaciones de autor.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary"><Heart className="h-5 w-5" /></div>
                            <div>
                                <h4 className="font-bold text-xl">Bandejas de Regalo</h4>
                                <p className="text-gray-500 text-sm">Detalles personalizados para cumpleaños y aniversarios.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary"><CheckCircle className="h-5 w-5" /></div>
                            <div>
                                <h4 className="font-bold text-xl">Certificación MVP</h4>
                                <p className="text-gray-500 text-sm">Repostería con técnicas de alta escuela y pasión local.</p>
                            </div>
                        </div>
                    </div>

                    <a target="_blank" rel="noopener noreferrer" href="https://wa.me/573126666666?text=estoy interesado en agendar una consulta gratuita" className="inline-block px-10 py-5 bg-primary text-white rounded-full font-bold hover:bg-white hover:text-primary transition-all shadow-xl shadow-primary/10 mt-5">
                        Agendar Consultoría Gratuita
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CustomServices;
