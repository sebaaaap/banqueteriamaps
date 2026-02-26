"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Instagram, ShoppingBag, Menu, X } from 'lucide-react';
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { items } = useQuoteStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Prevent scroll when menu is open
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const totalItems = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;
    const textColor = scrolled ? 'text-brand-black' : 'text-white';
    const iconColor = scrolled ? 'text-brand-black' : 'text-white';

    // Clean numbers for links
    const whatsappClean = config?.whatsapp?.replace(/\D/g, "") || "56976324033";
    const instagramUrl = config?.instagram || "https://instagram.com/banqueteriamaps";

    const openDrawer = () => {
        window.dispatchEvent(new CustomEvent('open-quote-drawer'));
    };

    const navLinks = [
        { name: 'Productos', href: '/productos' },
        { name: 'Servicios', href: '/servicios' },
        { name: 'Eventos Realizados', href: '/eventos' },
        { name: 'Contacto', href: '/#contacto' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
                        <div className="relative h-14 w-14 md:h-16 md:w-16">
                            <Image
                                src="/logo.png"
                                alt="Banquetería Maps"
                                fill
                                priority
                                className={`object-contain transition-all duration-300 ${!scrolled ? 'brightness-0 invert' : ''}`}
                            />
                        </div>
                        <div className="ml-3 hidden sm:flex flex-col leading-tight font-serif">
                            <span className={`${textColor} text-xs italic transition-colors duration-300`}>Banquetería</span>
                            <span className="text-brand-pink font-bold tracking-[0.2em] text-lg uppercase">MAPS</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className={`hidden md:flex space-x-8 items-center font-serif text-xs lg:text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${textColor}`}>
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="hover:text-brand-pink transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4 md:space-x-6">
                        {/* Cart Trigger */}
                        <button
                            onClick={openDrawer}
                            className={`relative group transition-all duration-300 ${iconColor} hover:text-brand-pink`}
                        >
                            <ShoppingBag size={22} />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300 border border-white">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        <div className="hidden sm:flex items-center space-x-4">
                            <a href={`https://wa.me/${whatsappClean}`} className={`hover:scale-110 transition-all duration-300 ${scrolled ? 'text-brand-pink' : 'text-white hover:text-brand-pink'}`}>
                                <Phone size={20} />
                            </a>
                            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={`hover:scale-110 transition-all duration-300 ${scrolled ? 'text-brand-pink' : 'text-white hover:text-brand-pink'}`}>
                                <Instagram size={20} />
                            </a>
                        </div>

                        {/* Mobile Menu Button - Fixed icon size and contrast */}
                        <button
                            className={`md:hidden p-1 transition-colors ${iconColor}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Menu - Enhanced accessibility and premium look */}
            <div className={`fixed inset-0 z-[60] bg-white transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full bg-white pt-28 px-8 space-y-8 font-serif">
                    {/* Header for mobile menu */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-center border-b border-gray-100 pb-4">
                        <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
                            <div className="relative h-10 w-10">
                                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                            </div>
                            <div className="ml-2 flex flex-col leading-tight font-serif">
                                <span className="text-gray-400 text-[10px] italic">Banquetería</span>
                                <span className="text-brand-pink font-bold text-sm tracking-widest uppercase">MAPS</span>
                            </div>
                        </Link>
                        <button onClick={() => setIsMenuOpen(false)} className="text-brand-black p-2">
                            <X size={28} />
                        </button>
                    </div>

                    <div className="flex flex-col space-y-6 pt-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-2xl font-serif tracking-widest text-brand-black hover:text-brand-pink border-b border-gray-50 pb-2 transition-colors uppercase"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex space-x-8 pt-6">
                        <a href={`https://wa.me/${whatsappClean}`} className="bg-brand-pink/10 p-3 rounded-full text-brand-pink hover:scale-110 transition-transform">
                            <Phone size={24} />
                        </a>
                        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="bg-brand-pink/10 p-3 rounded-full text-brand-pink hover:scale-110 transition-transform">
                            <Instagram size={24} />
                        </a>
                    </div>

                    <div className="mt-auto pb-10 text-center">
                        <p className="text-gray-400 text-xs tracking-widest uppercase opacity-60 italic">Banquetería MAPS • Gourmet & Style</p>
                    </div>
                </div>

                {/* Close backdrop if needed, though here it's full screen */}
            </div>
        </>
    );
}
