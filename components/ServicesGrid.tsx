"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { ArrowRight } from "lucide-react";

interface ServiceFromSanity {
    _id: string;
    titulo: string;
    descripcion: string;
    imagenPrincipal: any;
}

interface ServicesGridProps {
    servicesFromSanity?: ServiceFromSanity[];
}

const serviceLayouts = [
    {
        title: "Coctelería salada y dulce",
        link: "/servicios#cocteleria",
        gridClass: "lg:col-start-1 lg:row-start-1",
    },
    {
        title: "Banquetería Completa",
        link: "/servicios#banqueteria",
        gridClass: "lg:col-start-1 lg:row-start-2",
    },
    {
        title: "Cocteles extendidos",
        link: "/servicios#extendidos",
        gridClass: "lg:col-start-2 lg:row-start-1",
    },
    {
        title: "Coffee breaks",
        link: "/servicios#coffee",
        gridClass: "lg:col-start-2 lg:row-start-2",
    },
    {
        title: "Matrimonios y Celebraciones",
        subtitle: "TODO TIPO DE EVENTOS",
        link: "/servicios#matrimonios",
        gridClass: "lg:col-start-3 lg:row-start-1 lg:row-span-2",
        isLarge: true,
    },
];

export default function ServicesGrid({ servicesFromSanity = [] }: ServicesGridProps) {
    const normalize = (text: string) =>
        text ? text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() : "";

    const mergedServices = serviceLayouts.map((layout) => {
        const found = servicesFromSanity.find(s => normalize(s.titulo) === normalize(layout.title));

        return {
            ...layout,
            link: found ? `/servicios#${found._id}` : layout.link,
            description: found?.descripcion || "Experiencia gastronómica excepcional diseñada para tu evento.",
            image: found?.imagenPrincipal ? urlFor(found.imagenPrincipal).url() : "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop"
        };
    });

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
                    {mergedServices.map((service, index) => (
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
                                {(service as any).subtitle && (
                                    <span className="text-brand-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-3 drop-shadow-md">
                                        {(service as any).subtitle}
                                    </span>
                                )}
                                <h3 className={`font-serif font-bold text-white mb-2 leading-tight drop-shadow-lg group-hover:text-brand-gold transition-colors ${(service as any).isLarge ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                                    {service.title}
                                </h3>

                                <div className={`overflow-hidden transition-all duration-500 ${(service as any).isLarge ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100'}`}>
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
