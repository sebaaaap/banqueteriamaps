"use client";

import { X, ChevronLeft, ChevronRight, Plus, Check } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { urlFor } from "@/lib/sanity";

interface Product {
    _id: string;
    titulo: string;
    descripcion: string;
    imagenPrincipal: any;
    precio?: number;
    galeria?: string[];
}

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAdd: (product: Product) => void;
    isAdded: boolean;
}

export default function ProductModal({ product, isOpen, onClose, onAdd, isAdded }: ProductModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Reset image index when product changes
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [product]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen || !product) return null;

    // Collect all valid images for the modal
    const mainImageUrl = typeof product.imagenPrincipal === 'string'
        ? product.imagenPrincipal
        : (product.imagenPrincipal?.asset ? urlFor(product.imagenPrincipal).url() : '/b5.png');

    const images = [mainImageUrl];
    if (product.galeria && product.galeria.length > 0) {
        images.push(...product.galeria);
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black text-white p-2 rounded-full transition-colors backdrop-blur-md"
                >
                    <X size={20} />
                </button>

                {/* Left Side: Image Gallery */}
                <div className="w-full md:w-1/2 relative h-[35vh] md:h-auto min-h-[200px] shrink-0 bg-gray-100 flex items-center justify-center">
                    <Image
                        src={images[currentImageIndex]}
                        alt={`${product.titulo} - ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Navigation Arrows (only if > 1 image) */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>

                            {/* Dots Indicator */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all shadow-md ${idx === currentImageIndex ? 'bg-brand-pink w-5 sm:w-6' : 'bg-white/80'
                                            }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Right Side: Details */}
                <div className="w-full md:w-1/2 flex flex-col min-h-0 bg-white">
                    {/* Scrollable description */}
                    <div className="p-6 md:p-8 overflow-y-auto flex-1">
                        <h3 className="text-2xl md:text-4xl font-serif font-bold text-brand-black mb-3">
                            {product.titulo}
                        </h3>
                        <div className="w-10 md:w-12 h-1 bg-brand-pink mb-4"></div>
                        <p className="text-sm md:text-lg text-brand-gray font-light leading-relaxed">
                            {product.descripcion || "Sin descripción disponible."}
                        </p>
                    </div>

                    {/* Fixed Footer */}
                    <div className="p-6 md:p-8 pt-4 border-t border-gray-100 bg-white shrink-0 mt-auto">
                        <div className="flex flex-col gap-4">
                            {product.precio && (
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 font-light text-[10px] md:text-xs uppercase px-1 tracking-widest mt-1">Valor:</span>
                                    <span className="text-2xl md:text-3xl font-bold text-brand-black">
                                        ${product.precio.toLocaleString('es-CL')}
                                    </span>
                                </div>
                            )}
                            <button
                                onClick={() => onAdd(product)}
                                className={`w-full flex items-center justify-center gap-2 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all duration-300 transform active:scale-95 shadow-lg ${isAdded
                                    ? "bg-green-500 text-white"
                                    : "bg-brand-black text-white hover:bg-brand-pink"
                                    }`}
                            >
                                {isAdded ? (
                                    <>
                                        <Check size={18} />
                                        Añadido
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
                </div>
            </div>
        </div>
    );
}
