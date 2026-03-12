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

function getDynamicGridSpans(totalItems: number) {
    const lgSpans: number[] = [];
    const mdSpans: number[] = [];

    // LG Spans (3 columns)
    let itemsLeftLg = totalItems;
    const lgPatterns = [[1, 1, 1], [2, 1], [1, 2]];
    let lgPIndex = 0;
    while (itemsLeftLg > 0) {
        if (itemsLeftLg === 1) {
            lgSpans.push(3);
            itemsLeftLg -= 1;
        } else if (itemsLeftLg === 2) {
            lgSpans.push(1, 2);
            itemsLeftLg -= 2;
        } else {
            const p = lgPatterns[lgPIndex % lgPatterns.length];
            lgSpans.push(...p);
            itemsLeftLg -= p.length;
            lgPIndex++;
        }
    }

    // MD Spans (2 columns)
    let itemsLeftMd = totalItems;
    while (itemsLeftMd > 0) {
        if (itemsLeftMd === 1) {
            mdSpans.push(2);
            itemsLeftMd -= 1;
        } else {
            mdSpans.push(1, 1);
            itemsLeftMd -= 2;
        }
    }

    return { lgSpans, mdSpans };
}

export default function ServicesGrid({ servicesFromSanity = [] }: ServicesGridProps) {
    const totalItems = servicesFromSanity.length;
    const { lgSpans, mdSpans } = getDynamicGridSpans(totalItems);

    const mergedServices = servicesFromSanity.map((service: ServiceFromSanity, index: number) => {
        const lgSpan = lgSpans[index] || 1;
        const mdSpan = mdSpans[index] || 1;

        // Ensure Tailwind compiler picks these up by providing full string mappings
        const lgClass = lgSpan === 3 ? "lg:col-span-3 lg:row-span-1"
            : lgSpan === 2 ? "lg:col-span-2 lg:row-span-1"
                : "lg:col-span-1 lg:row-span-1";

        const mdClass = mdSpan === 2 ? "md:col-span-2 md:row-span-1"
            : "md:col-span-1 md:row-span-1";

        return {
            gridClass: `col-span-1 ${mdClass} ${lgClass}`,
            isLarge: lgSpan >= 2 || mdSpan >= 2,
            title: service.titulo,
            link: `/servicios#${service._id}`,
            description: service.descripcion || "Experiencia gastronómica excepcional diseñada para tu evento.",
            image: service.imagenPrincipal ? urlFor(service.imagenPrincipal).url() : "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop"
        };
    });

    if (totalItems === 0) return null;

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] lg:auto-rows-[320px]">
                    {mergedServices.map((service, index) => (
                        <div
                            key={index}
                            className={`group relative rounded-[2rem] overflow-hidden shadow-sm transition-all duration-700 hover:shadow-2xl h-full w-full ${service.gridClass}`}
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
