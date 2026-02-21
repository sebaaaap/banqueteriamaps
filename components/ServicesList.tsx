"use client";

import { useQuoteStore } from "@/lib/quote-store";
import { MessageSquare, Check, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ServiceProps {
    id: string;
    title: string;
    description: string;
    details: string[];
    image: string;
    pdfUrl: string;
    index: number;
}

export default function ServicesList({ services }: { services: ServiceProps[] }) {
    const addItem = useQuoteStore((state) => state.addItem);
    const [addedIds, setAddedIds] = useState<string[]>([]);

    const handleAdd = (service: ServiceProps) => {
        addItem({
            id: service.id,
            title: service.title,
            image: service.image,
        });

        setAddedIds((prev) => [...prev, service.id]);
        setTimeout(() => {
            setAddedIds((prev) => prev.filter((id) => id !== service.id));
        }, 2000);

        // No longer opening drawer automatically as per recent instruction
    };

    return (
        <div className="container mx-auto px-6 py-24 space-y-32">
            {services.map((service, index) => (
                <section
                    key={service.id}
                    id={service.id}
                    className={`flex flex-col md:flex-row gap-12 items-center scroll-mt-32 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                        }`}
                >
                    {/* Image */}
                    <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                        <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-black">
                            {service.title}
                        </h2>
                        <div className="w-16 h-1 bg-brand-pink"></div>
                        <p className="text-brand-gray text-lg font-light leading-relaxed">
                            {service.description}
                        </p>

                        <ul className="space-y-3 pt-4">
                            {service.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-brand-black/80">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-pink border border-brand-pink shrink-0" />
                                    <span className="font-light">{detail}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-8 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => handleAdd(service)}
                                className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 transform active:scale-95 shadow-lg text-sm ${addedIds.includes(service.id)
                                        ? "bg-green-500 text-white"
                                        : "bg-brand-black text-white hover:bg-brand-pink"
                                    }`}
                            >
                                {addedIds.includes(service.id) ? (
                                    <>
                                        <Check size={20} />
                                        Añadido
                                    </>
                                ) : (
                                    <>
                                        <Plus size={20} />
                                        Agregar a cotización
                                    </>
                                )}
                            </button>

                            <a
                                href={service.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-brand-pink text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-black transition-all shadow-lg text-sm"
                            >
                                Ver catálogo completo
                            </a>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
