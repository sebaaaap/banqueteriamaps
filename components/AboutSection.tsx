import Image from "next/image";
import { Quote } from "lucide-react";

export default function AboutSection() {
    return (
        <section className="relative py-32 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop')" }}>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="container relative z-10 mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <div className="mb-8 flex justify-center">
                        <div className="w-16 h-16 bg-brand-pink border-2 border-brand-gold rounded-full flex items-center justify-center shadow-lg">
                            <Quote size={32} className="text-white" />
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 uppercase tracking-widest">
                        Sobre Nosotros
                    </h2>

                    <p className="text-xl md:text-2xl font-light italic mb-12 leading-relaxed">
                        "En Banquetería MAPS, no solo servimos comida, creamos experiencias. Cada evento es una obra de arte culinaria diseñada para reflejar la personalidad y los sueños de nuestros clientes. Nuestra pasión es transformar ingredientes frescos en recuerdos inolvidables."
                    </p>

                    <div className="flex flex-col items-center justify-center">
                        <div className="w-20 h-20 relative rounded-full overflow-hidden border-2 border-brand-gold mb-4">
                            <Image
                                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
                                alt="Fundadora"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-bold font-serif">María Paz Silva</h3>
                        <p className="text-brand-gold text-sm uppercase tracking-widest font-bold">Fundadora & Chef Ejecutiva</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
