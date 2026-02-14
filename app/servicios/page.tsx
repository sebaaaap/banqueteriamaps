import Image from "next/image";
import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";
import ConfigSetter from "@/components/ConfigSetter";
import { client } from "@/lib/sanity";

interface Configuracion {
    whatsapp: string;
}

// Data fetching
async function getConfig() {
    const configQuery = `*[_type == "configuracion"][0]`;
    try {
        return await client.fetch<Configuracion>(configQuery).catch(() => ({ whatsapp: "56900000000" }));
    } catch (error) {
        console.error("Error fetching config:", error);
        return { whatsapp: "56900000000" };
    }
}

export default async function ServiciosPage() {
    const config = await getConfig();
    const whatsappNumber = config?.whatsapp?.replace(/\D/g, "") || "56900000000";

    const services = [
        {
            id: "cocteleria",
            title: "Coctelería Salada y Dulce",
            description: "Nuestra propuesta de coctelería está diseñada para sorprender. Ofrecemos una selección premium de bocados fríos y calientes, elaborados con ingredientes frescos y presentaciones artísticas.",
            details: [
                "Canapés gourmet con bases crujientes",
                "Mini ceviches y tartares",
                "Empanaditas de masa philo",
                "Brochetas de carne y verduras asadas",
                "Variedad de postres en formato shot",
                "Macarons y trufas artesanales"
            ],
            image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=1200&auto=format&fit=crop",
            linkText: "Cotizar Coctelería"
        },
        {
            id: "banqueteria",
            title: "Banquetería Completa",
            description: "Para eventos que requieren una experiencia gastronómica completa. Nos encargamos de todo, desde la recepción hasta el postre, con un servicio de mesa impecable.",
            details: [
                "Recepción con cóctel de bienvenida",
                "Entradas frías o calientes",
                "Platos de fondo con carnes, pescados o opciones vegetarianas",
                "Buffet de postres",
                "Estación de café y licores",
                "Decoración de mesas y vajilla completa"
            ],
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop",
            linkText: "Cotizar Banquetería"
        },
        {
            id: "extendidos",
            title: "Cócteles Extendidos",
            description: "La opción ideal para eventos dinámicos y modernos. Un servicio continuo de bocados y estaciones de comida que permite a los invitados socializar libremente.",
            details: [
                "Duración prolongada (3 a 5 horas)",
                "Estaciones temáticas (quesos, jamones, sushi)",
                "Servicio bandejeado constante",
                "Barra libre de bebidas y licores",
                "Montaje lounge opcional",
                "Ideal para lanzamientos de marca y fiestas de empresa"
            ],
            image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=1200&auto=format&fit=crop",
            linkText: "Cotizar Cóctel Extendido"
        },
        {
            id: "coffee",
            title: "Coffee Break",
            description: "Elevamos la pausa de tu reunión corporativa con un servicio de cafetería de alta calidad y bocados frescos para recargar energías.",
            details: [
                "Café de grano recién molido y té premium",
                "Jugos naturales prensados en frío",
                "Sandwiches gourmet en panes artesanales",
                "Medialunas y bollería fina",
                "Brochetas de fruta fresca",
                "Opciones saludables y sin gluten"
            ],
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
            linkText: "Cotizar Coffee Break"
        },
        {
            id: "matrimonios",
            title: "Matrimonios y Celebraciones",
            description: "Creamos bodas y fiestas inolvidables. Trabajamos mano a mano contigo para diseñar un menú y una ambientación que reflejen tu estilo personal.",
            details: [
                "Asesoría personalizada desde el primer día",
                "Degustación de menú para los novios",
                "Cóctel, cena y trasnoche",
                "Barra libre premium",
                "Decoración floral y ambientación",
                "Coordinación total del evento"
            ],
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
            linkText: "Cotizar Matrimonio"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-brand-white">
            <ConfigSetter whatsapp={config?.whatsapp || "56900000000"} />

            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
                    alt="Servicios de Banquetería"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 uppercase tracking-widest">
                        Nuestros Servicios
                    </h1>
                    <div className="w-24 h-1 bg-brand-pink mx-auto mb-6"></div>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
                        Gastronomía de excelencia para cada ocasión
                    </p>
                </div>
            </section>

            {/* Services List */}
            <div className="container mx-auto px-6 py-24 space-y-32">
                {services.map((service, index) => (
                    <section
                        key={service.id}
                        id={service.id}
                        className={`flex flex-col md:flex-row gap-12 items-center scroll-mt-32 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                            }`}
                    >
                        {/* Image */}
                        <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        {/* Content */}
                        <div className="w-full md:w-1/2 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-black">
                                {service.title}
                            </h2>
                            <div className="w-16 h-1 bg-brand-pink"></div>
                            <p className="text-brand-gray text-lg font-light leading-relaxed">
                                {service.description}
                            </p>

                            <ul className="space-y-3 pt-4">
                                {service.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-brand-black/80">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-pink border border-brand-pink shrink-0" />
                                        <span className="font-light">{detail}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-8">
                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=Hola Banquetería MAPS, me gustaría cotizar el servicio de ${service.title}.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-brand-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-pink transition-colors shadow-lg"
                                >
                                    <MessageSquare size={20} />
                                    {service.linkText}
                                </a>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* Final CTA */}
            <section className="bg-brand-cream py-24 px-6 text-center">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-black mb-6">
                        ¿No encuentras lo que buscas?
                    </h2>
                    <p className="text-brand-gray mb-10 text-lg font-light">
                        Podemos personalizar cada detalle para adaptarnos a tus necesidades específicas.
                        Contáctanos y diseñemos juntos tu evento ideal.
                    </p>
                    <Link
                        href="/#contacto"
                        className="inline-flex items-center gap-2 border-2 border-brand-black text-brand-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-brand-black hover:text-white transition-all duration-300"
                    >
                        Hablemos
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
