'use client';
import { useState, useEffect } from 'react';

const WhatsappIcon = ({ className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
);

export default function WhatsappButton({ whatsapp }: { whatsapp?: string }) {
    const whatsappClean = whatsapp?.replace(/\D/g, "") || "56976324033";
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 sm:gap-4 pointer-events-none">
            {/* Tooltip de texto que aparece al hacer hover (solo visible en escritorio) */}
            <div className="hidden md:block opacity-0 translate-x-4 transition-all duration-500 bg-brand-black/90 backdrop-blur-md text-brand-gold text-sm tracking-wide font-medium py-2 px-4 rounded-2xl shadow-xl border border-brand-gold/20 pointer-events-auto shadow-brand-gold/5" id="wsp-tooltip">
                ¡Cotiza tu evento!
            </div>

            <a
                href={`https://wa.me/${whatsappClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center pointer-events-auto transition-transform hover:scale-105 duration-300 active:scale-95"
                aria-label="Contactar por WhatsApp"
                onMouseEnter={() => {
                    const tooltip = document.getElementById('wsp-tooltip');
                    if (tooltip) {
                        tooltip.classList.remove('opacity-0', 'translate-x-4');
                        tooltip.classList.add('opacity-100', 'translate-x-0');
                    }
                }}
                onMouseLeave={() => {
                    const tooltip = document.getElementById('wsp-tooltip');
                    if (tooltip) {
                        tooltip.classList.remove('opacity-100', 'translate-x-0');
                        tooltip.classList.add('opacity-0', 'translate-x-4');
                    }
                }}
            >
                {/* Anillo de animación sutil (PULSE expansivo) - más transparente y lento */}
                <span
                    className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping"
                    style={{ animationDuration: '3s' }}
                />

                {/* Botón principal - más pequeño en móvil, tamaño normal en sm+ */}
                <div className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] p-3 sm:p-4 rounded-full text-white shadow-lg shadow-[#25D366]/30 group-hover:shadow-[0_8px_25px_rgb(37,211,102,0.5)] transition-shadow duration-500 border border-white/20">
                    {/* El ícono se reduce un poco en móvil */}
                    <WhatsappIcon className="w-6 h-6 sm:w-8 sm:h-8 group-hover:-rotate-12 transition-transform duration-500 drop-shadow-sm" />

                    {/* Brillo interno suave */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </a>
        </div>
    );
}
