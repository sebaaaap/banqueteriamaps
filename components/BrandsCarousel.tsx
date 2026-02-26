"use client";

import Image from "next/image";

interface Marca {
    nombre: string;
    logo: string;
}

interface BrandsCarouselProps {
    marcasFromSanity?: Marca[];
}

export default function BrandsCarousel({ marcasFromSanity = [] }: BrandsCarouselProps) {
    const defaultBrands = [
        { nombre: "Alaya", logo: "/empresas/alaya.png" },
        { nombre: "Arcor", logo: "/empresas/arcor.png" },
        { nombre: "Colgate", logo: "/empresas/colgate.png" },
        { nombre: "Integramedica", logo: "/empresas/integramedica.png" },
        { nombre: "Usach", logo: "/empresas/usach.png" },
        { nombre: "Weg", logo: "/empresas/weg.png" },
    ];

    const brands = marcasFromSanity.length > 0 ? marcasFromSanity : defaultBrands;

    // Help with infinite scroll if list is too short
    const displayBrands = brands.length < 10 ? [...brands, ...brands, ...brands] : brands;

    return (
        <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
            <div className="container mx-auto px-6 mb-8 text-center">
                <p className="text-sm font-serif font-bold text-gray-400 uppercase tracking-widest">
                    Confían en nosotros
                </p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex gap-12 px-8 items-center">
                    {displayBrands.map((brand, index) => (
                        <div key={`brand-1-${index}`} className="relative w-40 h-20 opacity-100 hover:scale-110 transition-all duration-300 flex items-center justify-center shrink-0">
                            <Image
                                src={brand.logo}
                                alt={brand.nombre}
                                fill
                                className="object-contain p-4"
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-12 px-8 items-center">
                    {displayBrands.map((brand, index) => (
                        <div key={`brand-2-${index}`} className="relative w-40 h-20 opacity-100 hover:scale-110 transition-all duration-300 flex items-center justify-center shrink-0">
                            <Image
                                src={brand.logo}
                                alt={brand.nombre}
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
