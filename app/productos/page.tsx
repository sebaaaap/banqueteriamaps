import ConfigSetter from "@/components/ConfigSetter";
import ProductsGrid from "@/components/productos/ProductsGrid";
import { client, urlFor } from "@/lib/sanity";
import { Suspense } from "react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Catálogo de Productos",
    description: "Explora nuestro exclusivo catálogo de productos gourmet. Desde opciones saladas y dulces hasta tablas premium para hacer de tu evento en Chile un momento inolvidable.",
    openGraph: {
        title: "Catálogo de Productos | Banquetería MAPS",
        description: "Descubre nuestra selección de bocados fríos, calientes y tablas premium.",
        url: "/productos",
        images: ["/b6.png"],
    }
};

interface Producto {
    _id: string;
    titulo: string;
    descripcion: string;
    imagenPrincipal: any;
    categoria: string;
    precio?: number;
    galeria?: string[];
}

interface Configuracion {
    whatsapp: string;
    email: string;
    instagram: string;
}

// Data fetching
async function getData() {
    // Fetch ALL productos
    const productsQuery = `*[_type == "producto"] | order(titulo asc){
    _id,
    titulo,
    descripcion,
    imagenPrincipal,
    precio,
    "galeria": galeria[].asset->url,
    "categoria": categoria->_id
  }`;

    const categoriesQuery = `*[_type == "categoriaCoctel"] | order(nombre asc){
    _id,
    nombre
  }`;

    const configQuery = `*[_type == "configuracion"][0]`;

    const heroQuery = `*[_type == "paginaHero" && pagina == "productos"][0]{
        titulo,
        subtitulo,
        imagen
    }`;

    try {
        const [products, categories, config, heroData] = await Promise.all([
            client.fetch<Producto[]>(productsQuery),
            client.fetch<any[]>(categoriesQuery),
            client.fetch<Configuracion>(configQuery).catch(() => ({ whatsapp: "56976324033", email: "", instagram: "" })),
            client.fetch<any>(heroQuery).catch(() => null),
        ]);
        return { products, categories, config, heroData };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { products: [], categories: [], config: null, heroData: null };
    }
}

export default async function ProductosPage() {
    const { products, categories, config, heroData } = await getData();

    const heroTitle = heroData?.titulo || "Catálogo de Productos";
    const heroSubtitulo = heroData?.subtitulo || null;
    const heroImageUrl = heroData?.imagen ? urlFor(heroData.imagen).url() : null;

    const dummyProducts = [
        {
            _id: 'dummy1',
            titulo: 'Cóctel Salado Premium',
            descripcion: 'Selección de 50 bocados gourmet fríos y calientes preparados con ingredientes de estación.',
            imagenPrincipal: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop',
            categoria: 'salado'
        },
        {
            _id: 'dummy2',
            titulo: 'Mini Gourmet Burgers',
            descripcion: 'Mini hamburguesas artesanales con cebolla caramelizada, queso fundido y salsa secreta MAPS.',
            imagenPrincipal: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop',
            categoria: 'salado'
        },
        {
            _id: 'dummy3',
            titulo: 'Tabla Mar y Tierra',
            descripcion: 'Quesos maduros, jamón serrano premium y nuestro clásico ceviche de reineta en formato shot.',
            imagenPrincipal: '/b6.png',
            categoria: 'tablas'
        },
        {
            _id: 'dummy4',
            titulo: 'Cóctel Dulce',
            descripcion: 'Exquisita variedad de bocados dulces y postres en formato mini para cerrar con broche de oro.',
            imagenPrincipal: '/b5.png',
            categoria: 'dulce'
        }
    ];

    const displayProducts = products && products.length > 0 ? products : dummyProducts;

    return (
        <div className="flex flex-col min-h-screen bg-brand-white">
            {config && <ConfigSetter whatsapp={config.whatsapp} />}

            {/* Mini Hero Section */}
            <section className="relative h-[30vh] flex items-center justify-center overflow-hidden bg-brand-black pt-20">
                <div className="absolute inset-0 bg-black/60 z-10" />
                {heroImageUrl ? (
                    <Image
                        src={heroImageUrl}
                        alt={heroTitle}
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 z-0 opacity-40" style={{ backgroundImage: "url('/b6.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
                )}
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 uppercase tracking-widest">
                        {heroTitle}
                    </h1>
                    <div className="w-16 h-1 bg-brand-pink mx-auto"></div>
                    {heroSubtitulo && (
                        <p className="text-gray-200 text-lg font-light mt-4 max-w-2xl mx-auto">{heroSubtitulo}</p>
                    )}
                </div>
            </section>

            {/* Main Grid Component (Client-side) */}
            <Suspense fallback={<div className="text-center py-20 text-brand-gray font-light">Cargando catálogo...</div>}>
                <ProductsGrid products={displayProducts} categoriesFromSanity={categories} />
            </Suspense>
        </div>
    );
}
