"use client";

import { motion } from "framer-motion";
import { ExternalLink, Instagram, Facebook, Video } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { useState, useEffect } from "react";

interface Evento {
    _id: string;
    nombreEvento: string;
    fecha?: string;
    descripcion?: string;
    galeriaFotos?: any[];
    videosRedes?: string[];
    videosSubidos?: string[];
    linkSocial?: string;
}

interface EventsSectionProps {
    eventos: Evento[];
    config?: {
        imagenFondoEventos?: any;
    };
}

export default function EventsSection({ eventos, config }: EventsSectionProps) {
    const backgroundImage = config?.imagenFondoEventos ? urlFor(config.imagenFondoEventos).url() : "/p2.jpg";
    // Mock data for testing when Sanity is empty
    const displayEvents = eventos && eventos.length > 0 ? eventos : [
        {
            _id: "mock-1",
            nombreEvento: "Momentos MAPS",
            fecha: "2024-11-20",
            descripcion: "Descubre la esencia de nuestra propuesta gastronómica a través de capturas reales de nuestros eventos.",
            galeriaFotos: [
                "/p1.jpg", "/p2.jpg", "/p3.jpg",
                "/p4.jpg", "/p2.jpg", "/p1.jpg",
                "/p3.jpg", "/p2.jpg", "/p1.jpg",
                "/p2.jpg", "/p3.jpg", "/p2.jpg",
                "/p1.jpg", "/p3.jpg", "/p4.jpg"
            ],
            videosRedes: [
                "https://www.instagram.com/p/DOdr-HXABwO/",
                "https://www.instagram.com/p/DOdr-HXABwO/",
            ],
            linkSocial: "https://www.instagram.com/banqueteriamaps/"
        }
    ];

    return (
        <section
            id="eventos"
            className="relative py-32 px-6 scroll-mt-24 overflow-hidden bg-fixed bg-center bg-cover"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
        >
            <div className="absolute inset-0 bg-black/70 pointer-events-none" />

            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10"
                >
                    <span className="text-brand-gold text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
                        Nuestra Trayectoria
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 uppercase tracking-tight font-bold">
                        Eventos Realizados
                    </h2>
                    <div className="flex justify-center gap-1 mb-8">
                        <div className="w-16 h-1 bg-brand-pink"></div>
                        <div className="w-16 h-1 bg-brand-gold"></div>
                    </div>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Cada evento es una historia de sabor y elegancia. Descubre cómo transformamos celebraciones en momentos inolvidables.
                    </p>
                </motion.div>

                <div className="space-y-40">
                    {displayEvents.map((evento, index) => (
                        <EventItem key={evento._id} evento={evento} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface MediaItem {
    type: 'image' | 'video';
    url: string;
    id: string;
}

function EventItem({ evento, index }: { evento: Evento; index: number }) {
    // Combine and shuffle content for a rich masonry feel
    const combinedMedia: MediaItem[] = [];
    // Filter images to skip those without an asset (avoids Sanity URL resolution errors)
    const images = (evento.galeriaFotos || []).filter(img => {
        if (typeof img === 'string') return true;
        return img && img.asset;
    });
    const socialVideos = evento.videosRedes || [];
    const nativeVideos = evento.videosSubidos || [];
    const videos = [...socialVideos, ...nativeVideos];

    // Interleave strategy: standard grid filling
    // tailored to roughly 1 video per 3-4 images if possible
    let imgIdx = 0;
    let vidIdx = 0;

    while (imgIdx < images.length || vidIdx < videos.length) {
        // Add a few images
        for (let k = 0; k < 3 && imgIdx < images.length; k++) {
            combinedMedia.push({ type: 'image', url: images[imgIdx] as any, id: `img-${imgIdx}` });
            imgIdx++;
        }
        // Add a video
        if (vidIdx < videos.length) {
            combinedMedia.push({ type: 'video', url: videos[vidIdx], id: `vid-${vidIdx}` });
            vidIdx++;
        }
    }

    return (
        <div className="mb-32 last:mb-0">
            {/* Minimal Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 uppercase tracking-widest">
                    {evento.nombreEvento}
                </h3>
                <div className="w-12 h-1 bg-brand-pink mx-auto"></div>
            </motion.div>

            {/* Dense Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px] grid-flow-dense">

                {combinedMedia.map((item, i) => {
                    // Smart Sizing Logic based on index and type
                    const isVideo = item.type === 'video';

                    // Default spans
                    let colSpan = "col-span-1";
                    let rowSpan = "row-span-1";

                    if (isVideo) {
                        colSpan = "col-span-1";
                        rowSpan = "row-span-2"; // Vertical video
                    } else {
                        // Image patterns
                        // Every 1st item big (if it fits flow)
                        if (i === 0) { colSpan = "col-span-2"; rowSpan = "row-span-2"; }
                        // Every 8th item wide
                        else if (i % 8 === 0) { colSpan = "col-span-2"; rowSpan = "row-span-1"; }
                        // Every 11th item big
                        else if (i % 11 === 0) { colSpan = "col-span-2"; rowSpan = "row-span-2"; }
                    }

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.05 }}
                            className={`relative rounded-2xl overflow-hidden shadow-sm group w-full h-full ${colSpan} ${rowSpan}`}
                        >
                            {/* Render Content based on type */}
                            {item.type === 'image' ? (
                                <>
                                    <Image
                                        src={
                                            typeof item.url === 'string'
                                                ? item.url
                                                : (item.url && (item.url as any).asset ? urlFor(item.url).width(800).url() : '/b5.png')
                                        }
                                        alt={evento.nombreEvento}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                </>
                            ) : (
                                <div className="w-full h-full relative">
                                    <VideoEmbed url={item.url} />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

function VideoEmbed({ url }: { url: string }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [embedType, setEmbedType] = useState<'instagram' | 'tiktok' | 'facebook' | 'native' | 'generic' | null>(null);

    useEffect(() => {
        if (url.includes('instagram.com')) setEmbedType('instagram');
        else if (url.includes('tiktok.com')) setEmbedType('tiktok');
        else if (url.includes('facebook.com')) setEmbedType('facebook');
        else if (url.includes('sanity.io') || url.endsWith('.mp4')) setEmbedType('native');
        else setEmbedType('generic');
    }, [url]);

    const getEmbedUrl = () => {
        if (embedType === 'instagram') {
            const cleanUrl = url.split('?')[0];
            return `${cleanUrl.endsWith('/') ? cleanUrl : cleanUrl + '/'}embed`;
        }
        if (embedType === 'tiktok') {
            const match = url.match(/\/video\/(\d+)/);
            if (match) return `https://www.tiktok.com/embed/v2/${match[1]}`;
        }
        if (embedType === 'facebook') {
            return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=500`;
        }
        return url;
    };

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg bg-black border border-gray-800">
            {!isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 gap-4 bg-zinc-900">
                    <Video size={30} className="animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest font-black">Cargando video...</span>
                </div>
            )}

            {embedType === 'native' ? (
                <video
                    src={url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoadedData={() => setIsLoaded(true)}
                />
            ) : (
                <iframe
                    src={getEmbedUrl()}
                    className={`w-full h-full border-none absolute inset-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} scale-125 origin-center`}
                    onLoad={() => setIsLoaded(true)}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    scrolling="no"
                    style={{ overflow: 'hidden' }}
                />
            )}

            <div className="absolute top-3 left-3 z-10 pointer-events-none opacity-50">
                {embedType === 'instagram' && <Instagram size={16} className="text-white drop-shadow-md" />}
                {embedType === 'facebook' && <Facebook size={16} className="text-white drop-shadow-md" />}
            </div>
        </div>
    );
}
