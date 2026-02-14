"use client";

import Image from "next/image";

const brands = [
    { name: "Empresa 1", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&auto=format" },
    { name: "Empresa 2", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&auto=format" },
    { name: "Empresa 3", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&auto=format" },
    { name: "Empresa 4", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&auto=format" },
    { name: "Empresa 5", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&auto=format" },
    { name: "Empresa 6", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&auto=format" },
];

export default function BrandsCarousel() {
    return (
        <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
            <div className="container mx-auto px-6 mb-8 text-center">
                <p className="text-sm font-serif font-bold text-gray-400 uppercase tracking-widest">
                    Confían en nosotros
                </p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex gap-16 px-8">
                    {/* Double the list for infinite scroll effect */}
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                        <div key={index} className="relative w-32 h-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            {/* Placeholder for actual logos */}
                            <span className="text-xl font-bold text-gray-300">{brand.name}</span>
                        </div>
                    ))}
                </div>

                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-16 px-8">
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                        <div key={`dup-${index}`} className="relative w-32 h-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            <span className="text-xl font-bold text-gray-300">{brand.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
