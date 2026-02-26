"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

interface CategoryFromSanity {
    _id: string;
    nombre: string;
    imagen: any;
}

interface AgendaSectionProps {
    hours?: number;
    categoriesFromSanity?: CategoryFromSanity[];
}

export default function AgendaSection({ hours = 48, categoriesFromSanity = [] }: AgendaSectionProps) {
    // Default categories if Sanity is empty
    const defaultCategories = [
        {
            _id: "salado",
            nombre: "CÓCTEL SALADO",
            imagen: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop",
        },
        {
            _id: "dulce",
            nombre: "CÓCTEL DULCE",
            imagen: "/b5.png",
        },
        {
            _id: "packs",
            nombre: "PACKS Y PROMOCIONES",
            imagen: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop",
        },
        {
            _id: "tablas",
            nombre: "TABLAS DE PICOTEO",
            imagen: "/b6.png",
        },
    ];

    const categories = categoriesFromSanity.length > 0 ? categoriesFromSanity : defaultCategories;

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
                    <Link href={`/productos?categoria=${cat._id}`} key={cat._id} className="relative group overflow-hidden min-h-[250px] md:h-full block">
                        <Image
                            src={typeof cat.imagen === 'string' ? cat.imagen : urlFor(cat.imagen).url()}
                            alt={cat.nombre}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                            <h3 className="text-white font-serif text-lg md:text-2xl font-bold mb-4 drop-shadow-md tracking-wider uppercase">
                                {cat.nombre}
                            </h3>
                            <button
                                className="bg-brand-pink text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold hover:bg-white hover:text-brand-pink transition-all transform hover:scale-105 shadow-xl uppercase"
                            >
                                Ver productos
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
