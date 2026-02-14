import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuoteItem {
    id: string;
    title: string;
    price?: number;
    image?: any;
    quantity: number;
}

interface QuoteStore {
    items: QuoteItem[];
    whatsappNumber: string;
    addItem: (product: Omit<QuoteItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    setWhatsappNumber: (number: string) => void;
}

export const useQuoteStore = create<QuoteStore>()(
    persist(
        (set) => ({
            items: [],
            whatsappNumber: "569XXXXXXXX",
            addItem: (product) =>
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === product.id);
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }
                    return { items: [...state.items, { ...product, quantity: 1 }] };
                }),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),
            updateQuantity: (id, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                })),
            clearCart: () => set({ items: [] }),
            setWhatsappNumber: (number) => set({ whatsappNumber: number }),
        }),
        {
            name: 'quote-storage',
        }
    )
);
