import ReviewsCarousel from "@/components/ReviewsCarousel";

// Google G Logo in SVG (solo para el header)
const GoogleLogoLarge = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-8 h-8">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.237,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

async function fetchGoogleReviews() {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
        return null;
    }

    const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=es`;

    try {
        // Revalidamos cada 1 semana (604800 segundos) para conservar créditos de la API
        const res = await fetch(url, {
            headers: {
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'displayName,rating,reviews,userRatingCount'
            },
            next: { revalidate: 604800 }
        });

        const data = await res.json();

        if (!res.ok || data.error) {
            console.error("Google Places API Error:", data.error?.message || res.status);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error fetching Google Reviews:", error);
        return null;
    }
}

export default async function GoogleReviews() {
    const placeData = await fetchGoogleReviews();
    const placeId = process.env.GOOGLE_PLACE_ID;

    // Reseñas dummy de respaldo
    const fallbackReviews = [
        {
            author_name: "María Ignacia S.",
            rating: 5,
            text: "El servicio fue espectacular. Contratamos la banquetería para nuestro matrimonio y la comida estaba deliciosa. ¡Totalmente recomendados!",
            relative_time_description: "hace 2 semanas",
            profile_photo_url: ""
        },
        {
            author_name: "Carlos Reyes",
            rating: 5,
            text: "Contratamos el servicio para un evento corporativo y superaron todas las expectativas. Puntualidad, presentación premium y sabores increíbles.",
            relative_time_description: "hace 1 mes",
            profile_photo_url: ""
        },
        {
            author_name: "Valentina M.",
            rating: 5,
            text: "Las tablas de quesos y la coctelería dulce son de otro planeta. Mis invitados quedaron fascinados. Excelente presentación.",
            relative_time_description: "hace 3 meses",
            profile_photo_url: ""
        }
    ];

    let reviewsList = fallbackReviews;
    let globalRating = "5.0";
    let totalReviews = 15;

    if (placeData?.reviews) {
        const formatted = placeData.reviews.map((r: any) => ({
            author_name: r.authorAttribution?.displayName || "Cliente",
            rating: r.rating || 5,
            text: r.text?.text || r.originalText?.text || "",
            relative_time_description: r.relativePublishTimeDescription || "",
            profile_photo_url: r.authorAttribution?.photoUri || ""
        }));

        // Solo 4-5 estrellas con texto real, máximo 5
        const filtered = formatted.filter(
            (r: any) => r.rating >= 4 && r.text && r.text.length > 10
        ).slice(0, 5);

        if (filtered.length > 0) reviewsList = filtered;
        globalRating = placeData.rating?.toFixed(1) || "5.0";
        totalReviews = placeData.userRatingCount || totalReviews;
    }

    return (
        <section className="py-24 bg-[#0a0a0a] border-t border-brand-gold/10 overflow-hidden relative">
            {/* Efectos de fondo */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-pink/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <GoogleLogoLarge />
                        <span className="text-white/50 text-sm tracking-[0.25em] uppercase font-light">Google Reviews</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-white font-bold tracking-wide">
                        Lo que dicen <span className="text-brand-gold italic">nuestros clientes</span>
                    </h2>
                </div>

                {/* Carrusel (client component) */}
                <ReviewsCarousel
                    reviews={reviewsList}
                    globalRating={globalRating}
                    totalReviews={totalReviews}
                    placeId={placeId}
                />
            </div>
        </section>
    );
}
