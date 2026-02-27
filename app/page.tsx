import Image from "next/image";
import Link from "next/link";
export const revalidate = 60;
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
  const marcasQuery = `*[_type == "marca"]{
    nombre,
    "logo": logo.asset->url
  }`;
  const heroQuery = `*[_type == "hero"][0]{
    slides[]{
      image,
      title,
      subtitle,
      "linkTo": linkTo->_id
    }
  }`;
  const nosotrosQuery = `*[_type == "nosotros"][0]`;

  const categoriesQuery = `*[_type == "categoriaCoctel"]{
    _id,
    nombre,
    imagen
  }`;

  try {
    const [products, services, events, config, heroData, nosotrosData, categoriesData, marcasData] = await Promise.all([
      client.fetch<Producto[]>(productsQuery),
      client.fetch<any[]>(`*[_type == "servicio"]`).catch(() => []),
      client.fetch<Evento[]>(eventsQuery).catch(() => []),
      client.fetch<any>(configQuery).catch(() => ({ whatsapp: "56976324033", email: "banqueteriamaps@gmail.com", instagram: "", horarios: [] })),
      client.fetch<any>(heroQuery).catch(() => null),
      client.fetch<any>(nosotrosQuery).catch(() => null),
      client.fetch<any[]>(categoriesQuery).catch(() => []),
      client.fetch<any[]>(marcasQuery).catch(() => [])
    ]);
    return { products, services, events, config, heroData, nosotrosData, categoriesData, marcasData };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { products: [], services: [], events: [], config: null, heroData: null, nosotrosData: null, categoriesData: [], marcasData: [] };
  }
}

export default async function Home() {
  const { products, services, events, config, heroData, nosotrosData, categoriesData, marcasData } = await getData();
  const whatsappNumber = config?.whatsapp?.replace(/\D/g, "") || "56976324033";

  return (
    <div className="flex flex-col min-h-screen">
      {config && <ConfigSetter whatsapp={config.whatsapp} />}
      <HeroCarousel slidesFromSanity={heroData?.slides} />
      <AgendaSection categoriesFromSanity={categoriesData} />
      <FeaturedProducts products={products.slice(0, 4)} />
      <ProcessSection />
      <ServicesGrid servicesFromSanity={services} />

      <AboutSection content={nosotrosData} />
      <BrandsCarousel marcasFromSanity={marcasData} />

      <CTASection whatsappNumber={whatsappNumber} />
    </div>
  );
}
