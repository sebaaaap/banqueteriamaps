'use client';
import { Star } from 'lucide-react';

const GoogleLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.237,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

interface Review {
    author_name: string;
    rating: number;
    text: string;
    relative_time_description: string;
    profile_photo_url: string;
}

interface Props {
    reviews: Review[];
    globalRating: string;
    totalReviews: number;
    placeId?: string;
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
    const initial = review.author_name.charAt(0).toUpperCase();

    // Colores de avatar para el fallback (como en la foto de referencia)
    const avatarColors = [
        'from-rose-500 to-rose-700',
        'from-blue-500 to-blue-700',
        'from-emerald-500 to-emerald-700',
        'from-amber-500 to-amber-700',
        'from-violet-500 to-violet-700',
    ];
    const color = avatarColors[index % avatarColors.length];

    return (
        <div className="shrink-0 w-72 bg-[#1a1a1a] border border-white/8 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/15 transition-colors duration-300 relative group">
            {/* Comilla decorativa sutil */}
            <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-8 h-8 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
            </div>

            {/* Fila superior: Avatar + Nombre + Logo Google */}
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full shrink-0 bg-gradient-to-br ${color} flex items-center justify-center ring-2 ring-white/10 overflow-hidden`}>
                    {review.profile_photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                                // Si falla la imagen mostramos la inicial
                                const target = e.currentTarget as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                    parent.innerHTML = `<span class="text-white font-bold text-sm">${initial}</span>`;
                                }
                            }}
                        />
                    ) : (
                        <span className="text-white font-bold text-sm">{initial}</span>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                        <h4 className="text-white font-semibold text-sm truncate uppercase tracking-wide">
                            {review.author_name}
                        </h4>
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5">{review.relative_time_description}</p>
                </div>
                <GoogleLogo />
            </div>

            {/* Estrellas */}
            <div className="flex gap-1 text-[#FFCA28]">
                {[...Array(Math.floor(review.rating))].map((_, idx) => (
                    <Star key={idx} size={14} fill="currentColor" stroke="none" />
                ))}
            </div>

            {/* Texto */}
            <p className="text-gray-400 text-sm font-light leading-relaxed italic line-clamp-4">
                "{review.text}"
            </p>
        </div>
    );
}

export default function ReviewsCarousel({ reviews, globalRating, totalReviews, placeId }: Props) {
    // Duplicar para el scroll infinito (igual que BrandsCarousel)
    const displayReviews = reviews.length < 5 ? [...reviews, ...reviews, ...reviews] : [...reviews, ...reviews];

    return (
        <div className="w-full">
            {/* Badge global rating */}
            <div className="flex justify-center mb-10">
                <a
                    href={placeId ? `https://search.google.com/local/reviews?placeid=${placeId}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 hover:bg-white/8 transition-colors"
                >
                    <GoogleLogo />
                    <div className="w-px h-5 bg-white/15" />
                    <span className="text-2xl font-bold text-white">{globalRating}</span>
                    <div className="flex gap-0.5 text-[#FFCA28]">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" stroke="none" />)}
                    </div>
                    <div className="w-px h-5 bg-white/15" />
                    <span className="text-gray-400 text-xs">{totalReviews} reseñas en Google</span>
                </a>
            </div>

            {/* Track con scroll infinito igual que BrandsCarousel */}
            <div className="relative flex overflow-x-hidden group">
                {/* Gradientes en los bordes para efecto de desvanecimiento */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

                {/* Track 1 */}
                <div className="animate-marquee flex gap-5 px-5 group-hover:[animation-play-state:paused]">
                    {displayReviews.map((review, index) => (
                        <ReviewCard key={`r1-${index}`} review={review} index={index % reviews.length} />
                    ))}
                </div>

                {/* Track 2 (copia para el loop infinito) */}
                <div className="absolute top-0 animate-marquee2 flex gap-5 px-5 group-hover:[animation-play-state:paused]">
                    {displayReviews.map((review, index) => (
                        <ReviewCard key={`r2-${index}`} review={review} index={index % reviews.length} />
                    ))}
                </div>
            </div>
        </div>
    );
}
