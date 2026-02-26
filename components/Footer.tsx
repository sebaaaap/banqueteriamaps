import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Phone, Mail, Facebook } from 'lucide-react';

const TikTokIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

interface FooterProps {
    config?: {
        whatsapp?: string;
        email?: string;
        instagram?: string;
        facebook?: string;
        tiktok?: string;
        horarios?: string[];
    };
}

export default function Footer({ config }: FooterProps) {
    const defaultHours = ["9am a 20pm"];
    const hours = config?.horarios?.length ? config.horarios : defaultHours;
    const whatsappClean = config?.whatsapp?.replace(/\D/g, "") || "56976324033";

    return (
        <footer className="bg-brand-black py-20 border-t border-white/5 text-white">
            <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">

                {/* Brand Column */}
                <div className="col-span-1 md:col-span-2 space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="relative h-16 w-16">
                            <Image
                                src="/logo.png"
                                alt="Banquetería Maps"
                                fill
                                className="object-contain brightness-0 invert"
                            />
                        </div>
                        <h3 className="font-serif text-3xl font-bold text-white tracking-wider">
                            Banquetería <span className="text-brand-gold">MAPS</span>
                        </h3>
                    </div>
                    <p className="text-gray-400 max-w-sm font-light leading-relaxed">
                        Creando momentos inolvidables a través de la alta gastronomía y un diseño excepcional. Tu evento, nuestra pasión.
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex space-x-3 pt-2">
                        {config?.instagram && (
                            <a href={config.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-3 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-black transition-all duration-300 group">
                                <Instagram size={20} className="text-gray-300 group-hover:text-brand-black" />
                            </a>
                        )}
                        {config?.facebook && (
                            <a href={config.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-3 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-black transition-all duration-300 group">
                                <Facebook size={20} className="text-gray-300 group-hover:text-brand-black" />
                            </a>
                        )}
                        {config?.tiktok && (
                            <a href={config.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-3 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-black transition-all duration-300 group">
                                <TikTokIcon size={20} className="text-gray-300 group-hover:text-brand-black" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-serif font-bold mb-6 uppercase tracking-[0.2em] text-sm text-brand-gold">Enlaces</h4>
                    <ul className="space-y-4 text-gray-400 font-light text-sm">
                        <li><a href="/#servicios" className="hover:text-brand-gold transition-colors">Nuestros Servicios</a></li>
                        <li><a href="/eventos" className="hover:text-brand-gold transition-colors">Galería de Eventos</a></li>
                        <li><a href="/productos" className="hover:text-brand-gold transition-colors">Catálogo de Productos</a></li>
                        <li><a href="/servicios" className="hover:text-brand-gold transition-colors">Servicios Detallados</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="font-serif font-bold mb-6 uppercase tracking-[0.2em] text-sm text-brand-gold">Contacto</h4>
                    <div className="space-y-4">
                        <a href={`mailto:${config?.email || 'banqueteriamaps@gmail.com'}`} className="flex items-center gap-4 group">
                            <div className="p-2 rounded-full bg-white/5 group-hover:bg-brand-gold transition-colors">
                                <Mail size={18} className="text-gray-300 group-hover:text-brand-black" />
                            </div>
                            <span className="text-gray-400 group-hover:text-white transition-colors text-sm">{config?.email || 'banqueteriamaps@gmail.com'}</span>
                        </a>

                        <a href={`https://wa.me/${whatsappClean}`} className="flex items-center gap-4 group">
                            <div className="p-2 rounded-full bg-white/5 group-hover:bg-brand-gold transition-colors">
                                <Phone size={18} className="text-gray-300 group-hover:text-brand-black" />
                            </div>
                            <span className="text-gray-400 group-hover:text-white transition-colors text-sm">{config?.whatsapp || '+56 9 7632 4033'}</span>
                        </a>

                        <div className="flex flex-col gap-2 pt-2">
                            {hours.map((line, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="p-2 rounded-full bg-white/5">
                                        <span className="text-brand-gold text-xs font-bold font-serif">H</span>
                                    </div>
                                    <span className="text-gray-400 text-sm">{line}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                                © {new Date().getFullYear()} Banquetería MAPS.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
