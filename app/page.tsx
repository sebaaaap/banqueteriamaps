import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { Download, MessageSquare } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import AgendaSection from "@/components/AgendaSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ConfigSetter from "@/components/ConfigSetter";
import ProcessSection from "@/components/ProcessSection";
import ServicesGrid from "@/components/ServicesGrid";
import BrandsCarousel from "@/components/BrandsCarousel";
import AboutSection from "@/components/AboutSection";

// Interfaces
interface Servicio {
  _id: string;
  titulo: string;
  descripcion: string;
  imagenPrincipal: any;
  pdfMenu?: string; // URL string from projection
}

interface Evento {
  _id: string;
  titulo: string;
  imagen: any;
}

interface Configuracion {
  whatsapp: string;
  email: string;
  instagram: string;
}

// Data fetching
async function getData() {
  const servicesQuery = `*[_type == "servicio"]{
    _id,
    titulo,
    descripcion,
    imagenPrincipal,
    "pdfMenu": pdfMenu.asset->url
  }`;

  // Assuming 'evento' exists, otherwise returns empty or error. 
  // If error, try-catch or just return empty for now to avoid crash.
  const eventsQuery = `*[_type == "evento"]{
    _id,
    titulo,
    imagen
  }`;

  const configQuery = `*[_type == "configuracion"][0]`;

  try {
    const [services, events, config] = await Promise.all([
      client.fetch<Servicio[]>(servicesQuery),
      client.fetch<Evento[]>(eventsQuery).catch(() => []),
      client.fetch<Configuracion>(configQuery).catch(() => ({ whatsapp: "56976324033", email: "banqueteriamaps@gmail.com", instagram: "" })),
    ]);
    return { services, events, config };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { services: [], events: [], config: null };
  }
}

export default async function Home() {
  const { services, events, config } = await getData();
  const whatsappNumber = config?.whatsapp?.replace(/\D/g, "") || "56976324033";

  return (
    <div className="flex flex-col min-h-screen">
      {config && <ConfigSetter whatsapp={config.whatsapp} />}
      {/* Hero Section & Agenda Section combined for initial view */}
      <HeroCarousel />
      <AgendaSection />
      <FeaturedProducts products={services.slice(0, 4)} />
      <ProcessSection />

      {/* Services Section */}

      <ServicesGrid />
      <AboutSection />
      <BrandsCarousel />



      {/* CTA Section */}
      <section id="contacto" className="py-24 bg-white text-brand-black text-center px-4 relative overflow-hidden scroll-mt-24">

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight">
            ¿Listo para llevar tu evento al siguiente nivel?
          </h2>
          <p className="text-brand-gray mb-12 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Cuéntanos tu idea y nosotros nos encargamos de convertirla en una experiencia gastronómica inolvidable.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-pink text-brand-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-pink/90 transition-all hover:scale-105 shadow-xl"
          >
            <MessageSquare size={24} />
            Contactar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
