import { ShoppingCart, Truck, CreditCard, ShoppingBag } from "lucide-react";

const steps = [
    {
        icon: ShoppingCart,
        title: "ELIGE TUS PRODUCTOS",
        description: "Revisa nuestro catálogo y añade lo que necesites a tu lista.",
    },
    {
        icon: Truck,
        title: "CONOCE LOS VALORES",
        description: "Te enviamos el presupuesto detallado y opciones de envío.",
    },
    {
        icon: CreditCard,
        title: "FORMAS DE PAGO",
        description: "Paga de forma rápida y segura para confirmar tu reserva.",
    },
    {
        icon: ShoppingBag,
        title: "RECIBE TU PEDIDO",
        description: "Entrega puntual en tu domicilio o lugar del evento.",
    },
];

export default function ProcessSection() {
    return (
        <section className="bg-brand-black py-20 px-6 border-y border-white/5">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            {/* Icon Circle */}
                            <div className="w-16 h-16 bg-white/5 border border-brand-gold/30 rounded-full flex items-center justify-center mb-6 shadow-2xl transition-all duration-300 group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:shadow-[0_0_20px_rgba(197,160,40,0.3)]">
                                <step.icon className="text-brand-gold group-hover:text-brand-black transition-colors duration-300" size={28} />
                            </div>

                            {/* Text */}
                            <h3 className="text-white font-serif font-bold text-base md:text-lg mb-3 tracking-widest uppercase group-hover:text-brand-gold transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-gray-400 text-[13px] font-light leading-relaxed max-w-[220px] font-sans">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
