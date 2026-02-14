"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        id: "salado",
        title: "CÓCTEL SALADO",
        image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: "dulce",
        title: "CÓCTEL DULCE",
        image: "/b5.png",
    },
    {
        id: "packs",
        title: "PACKS Y PROMOCIONES",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: "tablas",
        title: "TABLAS DE PICOTEO",
        image: "/b6.png",
    },
];

interface AgendaSectionProps {
    hours?: number;
}

export default function AgendaSection({ hours = 48 }: AgendaSectionProps) {
    return (
        <section className="bg-black text-white overflow-hidden flex flex-col h-auto md:h-[40vh]">
            {/* Black Banner Bar */}
            <div className="py-5 border-y border-white/10 flex items-center justify-center gap-6 px-4 bg-black">
                <div className="h-[1px] bg-white/30 flex-grow max-w-[300px] hidden md:block" />
                <h2 className="text-sm md:text-xl font-serif tracking-[0.2em] text-center font-bold">
                    AGENDA TUS PEDIDOS CON {hours} HORAS DE ANTICIPACIÓN
                </h2>
                <div className="h-[1px] bg-white/30 flex-grow max-w-[300px] hidden md:block" />
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 flex-grow">
                {categories.map((cat) => (
                    <div key={cat.id} className="relative group overflow-hidden min-h-[250px] md:h-full">
                        <Image
                            src={cat.image}
                            alt={cat.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                            <h3 className="text-white font-serif text-lg md:text-2xl font-bold mb-4 drop-shadow-md tracking-wider uppercase">
                                {cat.title}
                            </h3>
                            <Link
                                href={`#servicios`}
                                className="bg-brand-pink text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold hover:bg-white hover:text-brand-pink transition-all transform hover:scale-105 shadow-xl uppercase"
                            >
                                Ver productos
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
