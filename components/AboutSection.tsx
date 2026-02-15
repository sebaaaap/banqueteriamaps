import Image from "next/image";

export default function AboutSection() {
    return (
        <section id="sobre-nosotros" className="relative py-32 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop')" }}>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="container relative z-10 mx-auto px-6">
                <div className="max-w-5xl mx-auto flex justify-center">
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-gold/30">
                        <Image
                            src="/nosotros.png"
                            alt="Sobre Nosotros - Banquetería MAPS"
                            width={1200}
                            height={800}
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
