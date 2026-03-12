import Image from "next/image";
import { ArrowRight } from "lucide-react";
export const revalidate = 60;
import ConfigSetter from "@/components/ConfigSetter";
import { client, urlFor } from "@/lib/sanity";
import ServicesList from "@/components/ServicesList";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nuestros Servicios",
    description: "Conoce los servicios completos de Banquetería MAPS. Ofrecemos catering para matrimonios, eventos corporativos, coffee breaks y celebraciones exclusivas en Chile.",
    openGraph: {
        title: "Servicios de Banquetería Premium | MAPS",
        description: "Gastronomía de excelencia para cada ocasión. Menús personalizados y atención de primer nivel.",
        url: "/servicios",
    }
};

interface Configuracion {
    whatsapp: string;
}

// Data fetching
async function getData() {
    const configQuery = `*[_type == "configuracion"][0]`;
    const servicesQuery = `*[_type == "servicio"]{
        _id,
        titulo,
        descripcion,
        "caracteristicas": caracteristicas[],
        "imagenPrincipal": imagenPrincipal.asset->url,
        "pdfMenu": pdfMenu.asset->url
    }`;

    const heroQuery = `*[_type == "paginaHero" && pagina == "servicios"][0]{
        titulo,
        subtitulo,
        imagen
    }`;

    try {
        const [config, sanityServices, heroData] = await Promise.all([
            client.fetch<Configuracion>(configQuery).catch(() => ({ whatsapp: "56976324033" })),
            client.fetch<any[]>(servicesQuery).catch(() => []),
            client.fetch<any>(heroQuery).catch(() => null),
        ]);
        return { config, sanityServices, heroData };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { config: { whatsapp: "56976324033" }, sanityServices: [], heroData: null };
    }
}

export default async function ServiciosPage() {
    const { config, sanityServices, heroData } = await getData();
    const whatsappNumber = config?.whatsapp?.replace(/\D/g, "") || "56976324033";

    const heroTitle = heroData?.titulo || "Nuestros Servicios";
    const heroSubtitulo = heroData?.subtitulo || "Gastronomía de excelencia para cada ocasión";
    const heroImageUrl = heroData?.imagen
        ? urlFor(heroData.imagen).url()
        : "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop";

    const normalizedServices = sanityServices.map((service, index) => ({
        id: service._id || `servicio-${index}`,
        title: service.titulo || "Título del servicio",
        description: service.descripcion || "",
        details: service.caracteristicas || [],
        image: service.imagenPrincipal || "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=1200&auto=format&fit=crop",
        pdfUrl: service.pdfMenu || "/catalogo.pdf",
        index
    }));

    return (
        <div className="flex flex-col min-h-screen bg-brand-white">
            <ConfigSetter whatsapp={config?.whatsapp || "56976324033"} />

            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <Image
                    src={heroImageUrl}
                    alt={heroTitle}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 uppercase tracking-widest">
                        {heroTitle}
                    </h1>
                    <div className="w-24 h-1 bg-brand-pink mx-auto mb-6"></div>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
                        {heroSubtitulo}
                    </p>
                </div>
            </section>

            {/* Services List Component */}
            <ServicesList services={normalizedServices} />

            {/* Final CTA */}
            <section className="bg-white py-24 px-6 text-center">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-black mb-6">
                        ¿No encuentras lo que buscas?
                    </h2>
                    <p className="text-brand-gray mb-10 text-lg font-light">
                        Podemos personalizar cada detalle para adaptarnos a tus necesidades específicas.
                        Contáctanos y diseñemos juntos tu evento ideal.
                    </p>
                    <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border-2 border-brand-black text-brand-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-brand-black hover:text-white transition-all duration-300"
                    >
                        Hablemos
                        <ArrowRight size={20} />
                    </a>
                </div>
            </section>
        </div>
    );
}
