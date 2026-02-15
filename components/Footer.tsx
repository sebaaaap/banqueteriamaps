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

export default function Footer() {
    return (
        <footer className="bg-brand-black py-20 border-t border-white/5 text-white">
            <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">

                {/* Brand Column */}
                <div className="col-span-1 md:col-span-2 space-y-6">
                    <h3 className="font-serif text-3xl font-bold mb-4 text-white tracking-wider">
                        MAPS <span className="text-brand-gold">Banquetería</span>
                    </h3>
                    <p className="text-gray-400 max-w-sm font-light leading-relaxed">
                        Creando momentos inolvidables a través de la alta gastronomía y un diseño excepcional. Tu evento, nuestra pasión.
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex space-x-3 pt-2">
                        <a href="#" aria-label="Instagram" className="p-3 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-black transition-all duration-300 group">
                            <Instagram size={20} className="text-gray-300 group-hover:text-brand-black" />
                        </a>
                        <a href="#" aria-label="Facebook" className="p-3 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-black transition-all duration-300 group">
                            <Facebook size={20} className="text-gray-300 group-hover:text-brand-black" />
                        </a>
                        <a href="#" aria-label="TikTok" className="p-3 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-black transition-all duration-300 group">
                            <TikTokIcon size={20} className="text-gray-300 group-hover:text-brand-black" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-serif font-bold mb-6 uppercase tracking-[0.2em] text-sm text-brand-gold">Enlaces</h4>
                    <ul className="space-y-4 text-gray-400 font-light text-sm">
                        <li><a href="#servicios" className="hover:text-brand-gold transition-colors">Nuestros Servicios</a></li>
                        <li><a href="#eventos" className="hover:text-brand-gold transition-colors">Galería de Eventos</a></li>
                        <li><a href="#contacto" className="hover:text-brand-gold transition-colors">Solicitar Cotización</a></li>
                        <li><a href="#" className="hover:text-brand-gold transition-colors">Preguntas Frecuentes</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="font-serif font-bold mb-6 uppercase tracking-[0.2em] text-sm text-brand-gold">Contacto</h4>
                    <div className="space-y-4">
                        <a href="mailto:banqueteriamaps@gmail.com" className="flex items-center gap-4 group">
                            <div className="p-2 rounded-full bg-white/5 group-hover:bg-brand-gold transition-colors">
                                <Mail size={18} className="text-gray-300 group-hover:text-brand-black" />
                            </div>
                            <span className="text-gray-400 group-hover:text-white transition-colors text-sm">banqueteriamaps@gmail.com</span>
                        </a>

                        <a href="tel:+56976324033" className="flex items-center gap-4 group">
                            <div className="p-2 rounded-full bg-white/5 group-hover:bg-brand-gold transition-colors">
                                <Phone size={18} className="text-gray-300 group-hover:text-brand-black" />
                            </div>
                            <span className="text-gray-400 group-hover:text-white transition-colors text-sm">+56 9 7632 4033</span>
                        </a>

                        <div className="flex items-center gap-4 pt-2">
                            <div className="p-2 rounded-full bg-white/5">
                                <span className="text-brand-gold text-xs font-bold font-serif">H</span>
                            </div>
                            <span className="text-gray-400 text-sm">9am a 20pm</span>
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
