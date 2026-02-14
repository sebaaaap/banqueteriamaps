"use client";

import { useQuoteStore } from "@/lib/quote-store";
import { ShoppingBag, X, Plus, Minus, Send, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

export default function QuoteCart() {
    const { items, removeItem, updateQuantity, clearCart, whatsappNumber } = useQuoteStore();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Fix hydration issues with zustand persist
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    const sendToWhatsApp = () => {
        const phoneNumber = whatsappNumber.replace(/\D/g, "");
        let message = "Hola Banquetería MAPS, me gustaría solicitar una cotización por los siguientes productos:\n\n";

        items.forEach((item, index) => {
            message += `${index + 1}. ${item.title} (Cantidad: ${item.quantity})\n`;
        });

        message += "\nEspero su respuesta, gracias.";

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
        clearCart();
        setIsOpen(false);
    };

    if (items.length === 0 && !isOpen) return null;

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-[60] bg-brand-pink text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
            >
                <div className="relative">
                    <ShoppingBag size={28} />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-brand-pink">
                            {totalItems}
                        </span>
                    )}
                </div>
                <span className="absolute right-full mr-4 bg-black text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                    Ver mi cotización
                </span>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[80] shadow-2xl transition-transform duration-500 ease-out border-l border-gray-100 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-brand-white">
                    <div>
                        <h2 className="text-xl font-serif font-bold text-brand-black">Tu Cotización</h2>
                        <p className="text-sm text-brand-gray font-light">Solicita presupuesto por estos productos</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                            <ShoppingBag size={64} className="text-brand-gray" />
                            <p className="font-serif">Tu lista de cotización está vacía</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                                    {item.image && (
                                        <Image
                                            src={urlFor(item.image).url()}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <div className="flex-grow flex flex-col justify-between py-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-serif font-bold text-brand-black leading-tight">
                                            {item.title}
                                        </h3>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-300 hover:text-brand-pink transition-colors p-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 px-2 hover:bg-gray-50 transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-bold">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 px-2 hover:bg-gray-50 transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-8 border-t border-gray-100 bg-brand-cream space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-brand-gray font-light">Total de productos:</span>
                            <span className="font-bold text-brand-black">{totalItems}</span>
                        </div>
                        <button
                            onClick={sendToWhatsApp}
                            className="w-full bg-brand-pink text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-pink/20 uppercase tracking-widest text-sm"
                        >
                            <Send size={20} />
                            Enviar Cotización por WhatsApp
                        </button>
                        <p className="text-[10px] text-center text-brand-gray/60 uppercase tracking-widest">
                            Recibirás una respuesta personalizada en minutos
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
