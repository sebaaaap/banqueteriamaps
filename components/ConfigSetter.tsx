"use client";

import { useEffect } from "react";
import { useQuoteStore } from "@/lib/quote-store";

interface ConfigSetterProps {
    whatsapp: string;
}

export default function ConfigSetter({ whatsapp }: ConfigSetterProps) {
    const setWhatsappNumber = useQuoteStore((state) => state.setWhatsappNumber);

    useEffect(() => {
        if (whatsapp) {
            setWhatsappNumber(whatsapp);
        }
    }, [whatsapp, setWhatsappNumber]);

    return null;
}
