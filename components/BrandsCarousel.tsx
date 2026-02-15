"use client";

import Image from "next/image";

const brands = [
    { name: "Alaya", logo: "/empresas/alaya.png" },
    { name: "Arcor", logo: "/empresas/arcor.png" },
    { name: "Colgate", logo: "/empresas/colgate.png" },
    { name: "Integramedica", logo: "/empresas/integramedica.png" },
    { name: "Usach", logo: "/empresas/usach.png" },
    { name: "Weg", logo: "/empresas/weg.png" },
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
                <div className="animate-marquee whitespace-nowrap flex gap-12 px-8 items-center">
                    {/* Double the list for infinite scroll effect */}
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                        <div key={index} className="relative w-40 h-20 opacity-100 hover:scale-110 transition-all duration-300 flex items-center justify-center shrink-0">
                            <Image
                                src={brand.logo}
                                alt={brand.name}
                                fill
                                className="object-contain p-4"
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-12 px-8 items-center">
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                        <div key={`dup-${index}`} className="relative w-40 h-20 opacity-100 hover:scale-110 transition-all duration-300 flex items-center justify-center shrink-0">
                            <Image
                                src={brand.logo}
                                alt={brand.name}
                                fill
                                className="object-contain p-4"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
