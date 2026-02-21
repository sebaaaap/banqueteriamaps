import { MessageSquare } from "lucide-react";

interface CTASectionProps {
    whatsappNumber: string;
}

export default function CTASection({ whatsappNumber }: CTASectionProps) {
    return (
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
    );
}
