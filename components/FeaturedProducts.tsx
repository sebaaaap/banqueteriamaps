"use client";

import Image from "next/image";
import { useQuoteStore } from "@/lib/quote-store";
import { MessageSquare, Plus, Check } from "lucide-react";
import { useState } from "react";
import { urlFor } from "@/lib/sanity";

interface Product {
    _id: string;
    titulo: string;
    descripcion: string;
    imagenPrincipal: any;
}

interface FeaturedProductsProps {
    products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
    const addItem = useQuoteStore((state) => state.addItem);
    const [addedIds, setAddedIds] = useState<string[]>([]);

    const handleAdd = (product: any) => {
        addItem({
            id: product._id,
            title: product.titulo,
            image: product.imagenPrincipal,
        });

        setAddedIds((prev) => [...prev, product._id]);
        setTimeout(() => {
            setAddedIds((prev) => prev.filter((id) => id !== product._id));
        }, 2000);
    };

    const displayProducts = products && products.length > 0 ? products : [
        {
            _id: 'dummy1',
            titulo: 'Cóctel Salado Premium',
            descripcion: 'Selección de 50 bocados gourmet fríos y calientes preparados con ingredientes de estación.',
            imagenPrincipal: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop'
        },
        {
            _id: 'dummy2',
            titulo: 'Mini Gourmet Burgers',
            descripcion: 'Mini hamburguesas artesanales con cebolla caramelizada, queso fundido y salsa secreta MAPS.',
            imagenPrincipal: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop'
        },
        {
            _id: 'dummy3',
            titulo: 'Tabla Mar y Tierra',
            descripcion: 'Quesos maduros, jamón serrano premium y nuestro clásico ceviche de reineta en formato shot.',
            imagenPrincipal: '/b6.png'
        },
        {
            _id: 'dummy4',
            titulo: 'Cóctel Dulce',
            descripcion: 'Exquisita variedad de bocados dulces y postres en formato mini para cerrar con broche de oro.',
            imagenPrincipal: '/b5.png'
        }
    ];

    return (
        <section className="py-24 bg-white px-6">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-brand-black mb-4 uppercase tracking-tighter">
                        Productos Estrellas del Mes
                    </h2>
                    <div className="flex justify-center gap-1 mb-6">
                        <div className="w-12 h-1 bg-brand-pink"></div>
                        <div className="w-12 h-1 bg-brand-gold"></div>
                    </div>
                    <p className="text-brand-gray font-light max-w-2xl mx-auto italic">
                        Seleccionamos lo mejor de nuestra cocina para hacer de tu evento algo extraordinario.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayProducts.map((product) => (
                        <div key={product._id} className="group bg-brand-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full hover:-translate-y-2">
                            <div className="relative h-64 overflow-hidden">
                                {product.imagenPrincipal && (
                                    <Image
                                        src={typeof product.imagenPrincipal === 'string' ? product.imagenPrincipal : urlFor(product.imagenPrincipal).url()}
                                        alt={product.titulo}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                )}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="bg-brand-pink text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl border border-brand-gold">
                                        Destacado
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            </div>

                            <div className="p-8 flex flex-col flex-grow text-center">
                                <h3 className="text-xl font-serif font-bold mb-3 text-brand-black group-hover:text-brand-gold transition-colors h-14 flex items-center justify-center">
                                    {product.titulo}
                                </h3>
                                <p className="text-brand-gray text-sm mb-8 line-clamp-3 flex-grow font-light">
                                    {product.descripcion}
                                </p>

                                <button
                                    onClick={() => handleAdd(product)}
                                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all duration-300 transform active:scale-95 shadow-lg ${addedIds.includes(product._id)
                                        ? "bg-green-500 text-white translate-y-0"
                                        : "bg-brand-black text-white hover:bg-brand-pink hover:shadow-brand-pink/20"
                                        }`}
                                >
                                    {addedIds.includes(product._id) ? (
                                        <>
                                            <Check size={18} />
                                            Añadido a lista
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={18} />
                                            Añadir a Cotización
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
