"use client";
import Link from 'next/link';
import { Phone, Instagram, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useQuoteStore } from '@/lib/quote-store';

interface NavbarProps {
    config?: {
        whatsapp?: string;
        instagram?: string;
    }
}

export default function Navbar({ config }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);

    const { items } = useQuoteStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const totalItems = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;
    const textColor = scrolled ? 'text-brand-black' : 'text-white';

    // Clean numbers for links
    const whatsappClean = config?.whatsapp?.replace(/\D/g, "") || "56976324033";
    const instagramUrl = config?.instagram || "https://instagram.com/banqueteriamaps";

    const openDrawer = () => {
        window.dispatchEvent(new CustomEvent('open-quote-drawer'));
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className={`text-2xl font-serif font-bold tracking-wider transition-colors duration-300 ${textColor}`}>
                    MAPS <span className="text-brand-pink">Banquetería</span>
                </Link>

                <div className={`hidden md:flex space-x-8 items-center font-serif text-sm uppercase tracking-widest transition-colors duration-300 ${textColor}`}>
                    <Link href="/productos" className="hover:text-brand-pink transition-colors">Productos</Link>
                    <Link href="/servicios" className="hover:text-brand-pink transition-colors">Servicios</Link>
                    <Link href="/eventos" className="hover:text-brand-pink transition-colors">Eventos Realizados</Link>
                    <Link href="/#contacto" className="hover:text-brand-pink transition-colors">Contacto</Link>
                </div>

                <div className="flex items-center space-x-6">
                    {/* Cart Trigger */}
                    <button
                        onClick={openDrawer}
                        className={`relative group transition-all duration-300 ${scrolled ? 'text-brand-black hover:text-brand-pink' : 'text-white hover:text-brand-pink'}`}
                    >
                        <ShoppingBag size={22} />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300 border border-white">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    <a href={`https://wa.me/${whatsappClean}`} className={`hover:scale-110 transition-all duration-300 ${scrolled ? 'text-brand-pink' : 'text-white hover:text-brand-pink'}`}>
                        <Phone size={20} />
                    </a>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={`hover:scale-110 transition-all duration-300 ${scrolled ? 'text-brand-pink' : 'text-white hover:text-brand-pink'}`}>
                        <Instagram size={20} />
                    </a>
                </div>
            </div>
        </nav>
    );
}
