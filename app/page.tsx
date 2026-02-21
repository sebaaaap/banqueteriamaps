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
import CTASection from "@/components/CTASection";

// Interfaces
interface Producto {
  _id: string;
  titulo: string;
  descripcion: string;
  imagenPrincipal: any;
}

interface Evento {
  _id: string;
  nombreEvento: string;
  fecha?: string;
  descripcion?: string;
  galeriaFotos?: any[];
  videosRedes?: string[];
  linkSocial?: string;
}

interface Configuracion {
  whatsapp: string;
  email: string;
  instagram: string;
}

// Data fetching
async function getData() {
  const productsQuery = `*[_type == "producto" && destacado == true]{
    _id,
    titulo,
    descripcion,
    imagenPrincipal
  }`;

  const eventsQuery = `*[_type == "evento"] | order(fecha desc) {
    _id,
    nombreEvento,
    fecha,
    descripcion,
    galeriaFotos,
    videosRedes,
    linkSocial
  }`;

  const configQuery = `*[_type == "configuracion"][0]`;

  try {
    const [products, events, config] = await Promise.all([
      client.fetch<Producto[]>(productsQuery),
      client.fetch<Evento[]>(eventsQuery).catch(() => []),
      client.fetch<Configuracion>(configQuery).catch(() => ({ whatsapp: "56976324033", email: "banqueteriamaps@gmail.com", instagram: "" })),
    ]);
    return { products, events, config };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { products: [], events: [], config: null };
  }
}

export default async function Home() {
  const { products, events, config } = await getData();
  const whatsappNumber = config?.whatsapp?.replace(/\D/g, "") || "56976324033";

  return (
    <div className="flex flex-col min-h-screen">
      {config && <ConfigSetter whatsapp={config.whatsapp} />}
      <HeroCarousel />
      <AgendaSection />
      <FeaturedProducts products={products.slice(0, 4)} />
      <ProcessSection />
      <ServicesGrid />

      <AboutSection />
      <BrandsCarousel />

      <CTASection whatsappNumber={whatsappNumber} />
    </div>
  );
}
