"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
    {
        title: "Coctelería salada y dulce",
        description: "Bocados gourmet diseñados para deleitar todos los sentidos.",
        image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop",
        link: "/servicios#cocteleria",
        gridClass: "lg:col-start-1 lg:row-start-1",
    },
    {
        title: "Banquetería Completa",
        description: "Servicio integral con platos de fondo y atención personalizada.",
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
        link: "/servicios#banqueteria",
        gridClass: "lg:col-start-1 lg:row-start-2",
    },
    {
        title: "Cocteles extendidos",
        description: "Una experiencia prolongada con variedad de tiempos y sabores.",
        image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=800&auto=format&fit=crop",
        link: "/servicios#extendidos",
        gridClass: "lg:col-start-2 lg:row-start-1",
    },
    {
        title: "Coffee breaks",
        description: "El intermedio perfecto para reuniones y eventos corporativos.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
        link: "/servicios#coffee",
        gridClass: "lg:col-start-2 lg:row-start-2",
    },
    {
        title: "Matrimonios y Celebraciones",
        subtitle: "TODO TIPO DE EVENTOS",
        description: "Coctelería de alta gama para el día más importante de tu vida. Creamos momentos mágicos e inolvidables adaptados a tu estilo único.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
        link: "/servicios#matrimonios",
        gridClass: "lg:col-start-3 lg:row-start-1 lg:row-span-2",
        isLarge: true,
    },
];

export default function ServicesGrid() {
    return (
        <section id="servicios" className="py-24 bg-white px-6 scroll-mt-24">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-brand-black mb-4 uppercase tracking-[0.1em]">
                        Nuestros Servicios
                    </h2>
                    <div className="flex justify-center gap-1">
                        <div className="w-12 h-1 bg-brand-pink"></div>
                        <div className="w-12 h-1 bg-brand-gold"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:h-[650px]">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`group relative rounded-[2rem] overflow-hidden shadow-sm transition-all duration-700 hover:shadow-2xl h-[300px] lg:h-full ${service.gridClass}`}
                        >
                            {/* Background Image */}
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start z-10">
                                {service.subtitle && (
                                    <span className="text-brand-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-3 drop-shadow-md">
                                        {service.subtitle}
                                    </span>
                                )}
                                <h3 className={`font-serif font-bold text-white mb-2 leading-tight drop-shadow-lg group-hover:text-brand-gold transition-colors ${service.isLarge ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                                    {service.title}
                                </h3>

                                <div className={`overflow-hidden transition-all duration-500 ${service.isLarge ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100'}`}>
                                    <p className="text-gray-200 text-sm font-light mb-6 line-clamp-3">
                                        {service.description}
                                    </p>
                                </div>

                                <Link
                                    href={service.link}
                                    className="inline-flex items-center gap-2 bg-brand-pink text-white px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-brand-pink border border-brand-gold transition-all transform hover:scale-105 active:scale-95 shadow-xl mt-2"
                                >
                                    Ver más
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
