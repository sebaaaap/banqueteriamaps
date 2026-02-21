import Image from "next/image";
import { client } from "@/lib/sanity";
import ConfigSetter from "@/components/ConfigSetter";
import EventsSection from "@/components/EventsSection";
import CTASection from "@/components/CTASection";

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

    try {
        const [events, config] = await Promise.all([
            client.fetch<Evento[]>(eventsQuery).catch(() => []),
            client.fetch<Configuracion>(configQuery).catch(() => ({ whatsapp: "56976324033" })),
        ]);
        return { events, config };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { events: [], config: { whatsapp: "56976324033" } };
    }
}

export default async function EventosPage() {
    const { events, config } = await getData();
    const whatsappNumber = config?.whatsapp?.replace(/\D/g, "") || "56976324033";

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <ConfigSetter whatsapp={config?.whatsapp || "56976324033"} />

            {/* Events List */}
            <div className="">
                <EventsSection eventos={events} />
            </div>

            <CTASection whatsappNumber={whatsappNumber} />
        </div>
    );
}
