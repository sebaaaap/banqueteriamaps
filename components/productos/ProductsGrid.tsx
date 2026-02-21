"use client";

import Image from "next/image";
import { useQuoteStore } from "@/lib/quote-store";
import { Plus, Check, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { urlFor } from "@/lib/sanity";

interface Product {
    _id: string;
    titulo: string;
    descripcion: string;
    imagenPrincipal: any;
    categoria?: string;
}

interface ProductsGridProps {
    products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
    const addItem = useQuoteStore((state) => state.addItem);
    const [addedIds, setAddedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("todas");

    const categoriesList = [
        { id: "todas", label: "TODAS" },
        { id: "salado", label: "CÓCTEL SALADO" },
        { id: "dulce", label: "CÓCTEL DULCE" },
        { id: "packs", label: "PACKS Y PROMOCIONES" },
        { id: "tablas", label: "TABLAS DE PICOTEO" },
    ];

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

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.descripcion && p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === "todas" || p.categoria === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <section className="py-24 bg-white px-6 min-h-screen">
            <div className="container mx-auto max-w-7xl">
                {/* Search Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <h2 className="text-3xl font-serif text-brand-black uppercase tracking-widest font-bold">
                        Nuestro Catálogo
                    </h2>

                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all shadow-sm group-hover:shadow-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Categories Filter */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-12">
                    {categoriesList.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedCategory === cat.id
                                    ? "bg-brand-black text-white shadow-lg"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 font-light text-lg">
                        No se encontraron productos que coincidan con tu búsqueda.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <div key={product._id} className="group bg-brand-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full hover:-translate-y-2">
                                <div className="relative h-64 overflow-hidden">
                                    {product.imagenPrincipal ? (
                                        <Image
                                            src={typeof product.imagenPrincipal === 'string' ? product.imagenPrincipal : urlFor(product.imagenPrincipal).url()}
                                            alt={product.titulo}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                            <Image src="/b5.png" alt="Fallback" fill className="object-cover opacity-30" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                                </div>

                                <div className="p-8 flex flex-col flex-grow text-center">
                                    <h3 className="text-xl font-serif font-bold mb-3 text-brand-black group-hover:text-brand-gold transition-colors h-14 flex items-center justify-center">
                                        {product.titulo}
                                    </h3>
                                    <p className="text-brand-gray text-sm mb-8 line-clamp-3 flex-grow font-light">
                                        {product.descripcion || "Sin descripción disponible."}
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
                                                Añadido
                                            </>
                                        ) : (
                                            <>
                                                <Plus size={18} />
                                                Añadir
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
