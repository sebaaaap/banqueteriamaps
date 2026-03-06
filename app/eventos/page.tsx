import Image from "next/image";
import { client } from "@/lib/sanity";
export const revalidate = 60;
import ConfigSetter from "@/components/ConfigSetter";
import EventsSection from "@/components/EventsSection";
import CTASection from "@/components/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Galería de Eventos",
    description: "Inspírate con nuestra galería de eventos, matrimonios, y coffee breaks en Chile. Descubre cómo Banquetería MAPS puede hacer realidad la celebración de tus sueños.",
    keywords: ["galería eventos", "matrimonios fotos", "banquetería corporativa", "eventos banquetería maps"],
    openGraph: {
        title: "Galería de Eventos | Banquetería MAPS",
        description: "Revive los mejores momentos de nuestros eventos premium.",
        url: "/eventos",
    }
};

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
    imagenFondoEventos?: any;
}

async function getData() {
    const eventsQuery = `*[_type == "evento"] | order(fecha desc) {
    _id,
    nombreEvento,
    fecha,
    descripcion,
    galeriaFotos,
    videosRedes,
    "videosSubidos": videosSubidos[].asset->url,
    linkSocial
  }`;

    const configQuery = `*[_type == "configuracion"][0]`;
    const eventosPageQuery = `*[_type == "eventosPage"][0]`;

    try {
        const [events, config, eventosPage] = await Promise.all([
            client.fetch<Evento[]>(eventsQuery).catch(() => []),
            client.fetch<Configuracion>(configQuery).catch(() => ({ whatsapp: "56976324033" })),
            client.fetch<any>(eventosPageQuery).catch(() => null),
        ]);
        return { events, config, eventosPage };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { events: [], config: { whatsapp: "56976324033" }, eventosPage: null };
    }
}

export default async function EventosPage() {
    const { events, config, eventosPage } = await getData();
    const whatsappNumber = config?.whatsapp?.replace(/\D/g, "") || "56976324033";

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <ConfigSetter whatsapp={config?.whatsapp || "56976324033"} />

            {/* Events List */}
            <div className="">
                <EventsSection eventos={events} config={eventosPage} />
            </div>

            <CTASection whatsappNumber={whatsappNumber} />
        </div>
    );
}
