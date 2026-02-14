"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/p1.jpg",
    title: "EXPERIENCIAS QUE DEJAN HUELLA",
    subtitle: "Creamos momentos inolvidables a través de la alta gastronomía",
  },
  {
    image: "/p2.jpg",
    title: "COCTELERÍA DE VANGUARDIA",
    subtitle: "Formatos creativos y sabores excepcionales para tus invitados",
  },
  {
    image: "/p3.jpg",
    title: "CALIDAD EN CADA DETALLE",
    subtitle: "Productos frescos y procesos artesanales seleccionados",
  },
  {
    image: "/p4.jpg",
    title: "TU EVENTO, NUESTRA PASIÓN",
    subtitle: "Dedicación y elegancia en cada detalle de tu celebración",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  }, []);

  const prev = () => {
    setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className={`object-cover transition-transform duration-[10000ms] ease-linear ${index === current ? "scale-110" : "scale-100"}`}
            priority={index === 0}
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-widest mb-4 max-w-5xl uppercase drop-shadow-2xl">
              {slide.title}
            </h1>
            <p className="text-base md:text-xl lg:text-2xl font-light italic max-w-3xl opacity-90 drop-shadow-lg font-serif">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors text-white"
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === current ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
