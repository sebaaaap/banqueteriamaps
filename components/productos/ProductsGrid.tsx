"use client";

import Image from "next/image";
import { useQuoteStore } from "@/lib/quote-store";
import { Plus, Check, Search, X, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { urlFor } from "@/lib/sanity";
import { useSearchParams } from "next/navigation";
import ProductModal from "@/components/ProductModal";

interface Product {
    _id: string;
    titulo: string;
    descripcion: string;
    imagenPrincipal: any;
    categoria?: string;
    precio?: number;
    galeria?: string[];
}

interface Category {
    _id: string;
    nombre: string;
}

interface ProductsGridProps {
    products: Product[];
    categoriesFromSanity?: Category[];
}

function getProductImageSrc(imagenPrincipal: any): string {
    if (!imagenPrincipal) return "/b5.png";
    if (typeof imagenPrincipal === "string") return imagenPrincipal;
    if (imagenPrincipal?.asset) return urlFor(imagenPrincipal).url();
    return "/b5.png";
}

export default function ProductsGrid({ products, categoriesFromSanity = [] }: ProductsGridProps) {
    const searchParams = useSearchParams();
    const addItem = useQuoteStore((state) => state.addItem);
    const [addedIds, setAddedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("todas");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const catId = searchParams.get("categoria");
        if (catId) setSelectedCategory(catId);
    }, [searchParams]);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const categoriesList = [
        { id: "todas", label: "TODAS" },
        ...categoriesFromSanity.map(cat => ({
            id: cat._id,
            label: cat.nombre.toUpperCase()
        }))
    ];

    const handleAdd = useCallback((product: any, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        addItem({
            id: product._id,
            title: product.titulo,
            image: product.imagenPrincipal,
            price: product.precio
        });
        setAddedIds((prev) => [...prev, product._id]);
        setTimeout(() => {
            setAddedIds((prev) => prev.filter((id) => id !== product._id));
        }, 2000);
    }, [addItem]);

    const filteredProducts = products.filter(p => {
        const matchesSearch =
            p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.descripcion && p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === "todas" || p.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const suggestions = searchTerm.length > 0
        ? products.filter(p =>
            p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.descripcion && p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        : [];

    const clearSearch = () => {
        setSearchTerm("");
        setIsDropdownOpen(false);
        inputRef.current?.focus();
    };

    const handleSuggestionClick = (product: Product) => {
        setSearchTerm(product.titulo);
        setIsDropdownOpen(false);
        setSelectedProduct(product);
    };

    return (
        <section
            className="py-16 md:py-24 bg-white px-4 md:px-6 min-h-screen"
            aria-label="Catálogo de productos de Banquetería MAPS"
        >
            <div className="container mx-auto max-w-7xl">

                {/* Search Header */}
                <div className="flex flex-col gap-4 mb-8 md:mb-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h2 className="text-2xl md:text-3xl font-serif text-brand-black uppercase tracking-widest font-bold">
                            Nuestro Catálogo
                        </h2>
                        <p className="text-sm text-gray-400 font-light sm:self-center">
                            {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
                        </p>
                    </div>

                    {/* Smart Search Bar */}
                    <div ref={searchRef} className="relative w-full">
                        <label htmlFor="product-search" className="sr-only">
                            Buscar en el catálogo de productos de Banquetería MAPS
                        </label>
                        <div className="relative flex items-center">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none transition-colors"
                                aria-hidden="true"
                            />
                            <input
                                ref={inputRef}
                                id="product-search"
                                type="text"
                                autoComplete="off"
                                placeholder="Buscar productos..."
                                aria-label="Buscar productos"
                                aria-expanded={isDropdownOpen}
                                aria-controls="search-suggestions"
                                aria-autocomplete="list"
                                className="w-full pl-12 pr-12 py-3.5 md:py-3 bg-gray-50 hover:bg-white rounded-2xl md:rounded-full border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all shadow-sm focus:shadow-lg text-base md:text-sm"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setIsDropdownOpen(true);
                                }}
                                onFocus={() => {
                                    if (searchTerm.length > 0) setIsDropdownOpen(true);
                                }}
                            />
                            {searchTerm.length > 0 && (
                                <button
                                    onClick={clearSearch}
                                    aria-label="Limpiar búsqueda"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-200 hover:bg-brand-pink hover:text-white transition-all"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            )}
                        </div>

                        {/* Autocomplete Dropdown */}
                        {isDropdownOpen && searchTerm.length > 0 && (
                            <div
                                id="search-suggestions"
                                role="listbox"
                                aria-label="Sugerencias de productos"
                                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 flex flex-col"
                                style={{ maxHeight: "min(400px, 60vh)" }}
                            >
                                {suggestions.length > 0 ? (
                                    <div className="overflow-y-auto overscroll-contain">
                                        <div className="px-4 py-2.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 border-b border-gray-100 sticky top-0">
                                            {suggestions.length} resultado{suggestions.length !== 1 ? "s" : ""}
                                        </div>
                                        {suggestions.slice(0, 7).map((product) => (
                                            <div
                                                key={product._id}
                                                role="option"
                                                aria-selected="false"
                                                onClick={() => handleSuggestionClick(product)}
                                                className="px-4 py-3 hover:bg-brand-pink/5 active:bg-brand-pink/10 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0 transition-colors"
                                            >
                                                <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm border border-gray-100">
                                                    <Image
                                                        src={getProductImageSrc(product.imagenPrincipal)}
                                                        alt={product.titulo}
                                                        fill
                                                        className="object-cover"
                                                        sizes="48px"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-brand-black truncate leading-tight">
                                                        {product.titulo}
                                                    </p>
                                                    {product.descripcion && (
                                                        <p className="text-xs text-gray-400 font-light mt-0.5 truncate">
                                                            {product.descripcion}
                                                        </p>
                                                    )}
                                                    {product.precio ? (
                                                        <p className="text-xs text-brand-pink font-bold mt-1">
                                                            ${product.precio.toLocaleString("es-CL")}
                                                        </p>
                                                    ) : (
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                                                            A cotizar
                                                        </p>
                                                    )}
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" aria-hidden="true" />
                                            </div>
                                        ))}
                                        {suggestions.length > 7 && (
                                            <div className="px-4 py-3 text-center text-xs font-bold text-brand-pink uppercase tracking-widest bg-gray-50 border-t border-gray-100">
                                                ↓ {suggestions.length - 7} más en la lista de abajo
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="px-6 py-8 text-center flex flex-col items-center gap-3">
                                        <Search className="h-8 w-8 text-gray-300" aria-hidden="true" />
                                        <div className="text-gray-500 font-light text-sm">
                                            No hay resultados para{" "}
                                            <span className="font-bold text-gray-700">"{searchTerm}"</span>
                                        </div>
                                        <button
                                            onClick={clearSearch}
                                            className="text-xs text-brand-pink font-bold uppercase tracking-widest hover:underline"
                                        >
                                            Limpiar búsqueda
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Categories Filter */}
                <div
                    className="flex flex-wrap items-center justify-start gap-2 md:gap-3 mb-8 md:mb-12 -mx-1"
                    role="group"
                    aria-label="Filtrar por categoría"
                >
                    {categoriesList.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            aria-pressed={selectedCategory === cat.id}
                            className={`px-4 md:px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${selectedCategory === cat.id
                                ? "bg-brand-black text-white shadow-lg scale-105"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200 active:scale-95"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-16 md:py-20 flex flex-col items-center gap-4">
                        <Search className="h-12 w-12 text-gray-200" aria-hidden="true" />
                        <p className="text-gray-400 font-light text-lg">
                            No se encontraron productos.
                        </p>
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className="text-sm text-brand-pink font-bold uppercase tracking-widest hover:underline"
                            >
                                Limpiar búsqueda
                            </button>
                        )}
                    </div>
                ) : (
                    <div
                        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8"
                        role="list"
                        aria-label="Lista de productos"
                    >
                        {filteredProducts.map((product) => (
                            <article
                                key={product._id}
                                role="listitem"
                                onClick={() => setSelectedProduct(product)}
                                className="cursor-pointer group bg-brand-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full hover:-translate-y-1 md:hover:-translate-y-2 relative"
                                aria-label={`${product.titulo}${product.precio ? `, precio: $${product.precio.toLocaleString("es-CL")}` : ""}`}
                            >
                                <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                                    <span className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                                        Ver Más
                                    </span>
                                </div>
                                <div className="relative h-40 md:h-64 overflow-hidden">
                                    <Image
                                        src={getProductImageSrc(product.imagenPrincipal)}
                                        alt={`${product.titulo} - Banquetería MAPS`}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                                </div>

                                <div className="p-4 md:p-8 flex flex-col flex-grow text-center">
                                    <h3 className="text-base md:text-xl font-serif font-bold mb-1 md:mb-3 text-brand-black group-hover:text-brand-gold transition-colors leading-tight md:h-14 md:flex md:items-center md:justify-center">
                                        {product.titulo}
                                    </h3>
                                    <p className="text-brand-gray text-xs md:text-sm mb-4 md:mb-6 line-clamp-2 md:line-clamp-3 flex-grow font-light hidden sm:block">
                                        {product.descripcion || "Sin descripción disponible."}
                                    </p>

                                    {product.precio && (
                                        <div className="mb-3 md:mb-6">
                                            <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Precio</span>
                                            <span className="text-lg md:text-2xl font-bold text-brand-pink">
                                                ${product.precio.toLocaleString("es-CL")}
                                            </span>
                                        </div>
                                    )}

                                    <button
                                        onClick={(e) => handleAdd(product, e)}
                                        aria-label={`Agregar ${product.titulo} a la cotización`}
                                        className={`w-full flex items-center justify-center gap-1.5 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all duration-300 transform active:scale-95 shadow-lg text-sm md:text-base ${addedIds.includes(product._id)
                                            ? "bg-green-500 text-white"
                                            : "bg-brand-black text-white hover:bg-brand-pink"
                                            }`}
                                    >
                                        {addedIds.includes(product._id) ? (
                                            <>
                                                <Check size={16} aria-hidden="true" />
                                                <span>Añadido</span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus size={16} aria-hidden="true" />
                                                <span>Añadir</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAdd={(p) => handleAdd(p)}
                isAdded={selectedProduct ? addedIds.includes(selectedProduct._id) : false}
            />
        </section>
    );
}
