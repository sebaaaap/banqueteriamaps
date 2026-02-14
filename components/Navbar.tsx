"use client";
import Link from 'next/link';
import { Phone, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-serif font-bold tracking-wider text-brand-black">
                    MAPS <span className="text-brand-pink">Banquetería</span>
                </Link>

                <div className="hidden md:flex space-x-8 items-center font-serif text-sm uppercase tracking-widest text-brand-black">
                    <Link href="#servicios" className="hover:text-brand-pink transition-colors">Servicios</Link>
                    <Link href="#eventos" className="hover:text-brand-pink transition-colors">Eventos Realizados</Link>
                    <Link href="#contacto" className="hover:text-brand-pink transition-colors">Contacto</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-brand-pink hover:scale-110 transition-transform">
                        <Phone size={20} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-brand-pink hover:scale-110 transition-transform">
                        <Instagram size={20} />
                    </a>
                </div>
            </div>
        </nav>
    );
}
